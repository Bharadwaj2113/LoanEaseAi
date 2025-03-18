from flask import Blueprint, request, send_file, jsonify
import speech_recognition as sr
import re
import io
import wave
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

api = Blueprint('api', __name__)

# State management
CURRENT_STEP = '1'  # Start with the first question (1.mp4)
VIDEO_MAP = {
    '1': '1.mp4', '2': '2.mp4', '3': '3.mp4', '4': '4.mp4', '5': '5.mp4',
    '6': '6.mp4', '7': '7.mp4', '8': '8.mp4', '9': '9.mp4', '10': '10.mp4',
    '11': '11.mp4', '12': '12.mp4', '13': '13.mp4', '14': '14.mp4'
}
USER_DATA = {}  # Store user responses (text only)
STEP_ORDER = ['1', '2', '3', '4', '5', '6', '7', '9']  # Order of questions, ending with confirmation

# Validation rules for each step
VALIDATION_RULES = {
    '1': lambda x: bool(re.match(r'^[A-Za-z\s]+$', x)),  # Name: Letters and spaces only
    '2': lambda x: bool(re.match(r'^\d{2}/\d{2}/\d{4}$', x) or re.match(r'^\d{8}$', x)),  # DOB: DD/MM/YYYY or 8 digits
    '3': lambda x: bool(re.match(r'^\d+(?:\.\d{1,2})?$', x.split()[0]) and x.lower().split()[-1] in ['salaried', 'self-employed']),  # Income and type
    '4': lambda x: bool(re.match(r'^(yes|no)(?:\s+\d+(?:\.\d{1,2})?)?$', x.lower())),  # Yes/No with optional EMI
    '5': lambda x: bool(re.match(r'^\d+(?:\.\d{1,2})?$', x)),  # Loan amount
    '6': lambda x: True,  # Document upload (handled separately)
    '7': lambda x: True  # Face verification (handled separately)
}

@api.route('/get_video/<step>', methods=['GET'])
def get_video(step):
    video_path = f'videos/{VIDEO_MAP.get(step, "8.mp4")}'  # Default to error if step invalid
    return send_file(video_path, mimetype='video/mp4')

@api.route('/upload_audio', methods=['POST'])
def upload_audio():
    global CURRENT_STEP, USER_DATA
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio provided', 'next_step': '8'}), 400

    # Get the audio file from the request
    audio_file = request.files['audio']
    audio_data = audio_file.read()  # Read audio data into memory

    # Detect audio properties using wave
    try:
        wav_io = io.BytesIO(audio_data)
        with wave.open(wav_io, 'rb') as wav_file:
            sample_rate = wav_file.getframerate()
            sample_width = wav_file.getsampwidth()
            logger.debug(f"Detected sample_rate: {sample_rate}, sample_width: {sample_width}")
    except wave.Error as e:
        logger.error(f"Wave file format error: {str(e)}")
        return jsonify({'error': 'Invalid audio format', 'next_step': '8'}), 400

    # Process audio in memory without saving to disk
    recognizer = sr.Recognizer()
    try:
        audio = sr.AudioData(audio_data, sample_rate=sample_rate, sample_width=sample_width)
        text = recognizer.recognize_google(audio).strip()
        logger.debug(f"Recognized text: {text}")
        if CURRENT_STEP in VALIDATION_RULES and not VALIDATION_RULES[CURRENT_STEP](text):
            logger.warning(f"Invalid response format for step {CURRENT_STEP}: {text}")
            return jsonify({'error': 'Invalid response format', 'next_step': '8'}), 400
        USER_DATA[CURRENT_STEP] = text
        return jsonify({'text': text, 'next_step': 'confirm'})
    except sr.UnknownValueError:
        logger.error("Could not understand audio")
        return jsonify({'error': 'Could not understand audio', 'next_step': '8'}), 400
    except sr.RequestError as e:
        logger.error(f"Speech recognition service error: {str(e)}")
        return jsonify({'error': 'Speech recognition service error', 'next_step': '8'}), 500

@api.route('/confirm_response', methods=['POST'])
def confirm_response():
    global CURRENT_STEP, USER_DATA
    confirmed = request.json.get('confirmed', False)
    if confirmed:
        current_idx = STEP_ORDER.index(CURRENT_STEP)
        if current_idx + 1 < len(STEP_ORDER):
            CURRENT_STEP = STEP_ORDER[current_idx + 1]
        else:
            # Check eligibility (simplified logic)
            if float(USER_DATA.get('3', '0').split()[0]) < 20000:  # Income < 20,000
                CURRENT_STEP = '11'
            elif not re.match(r'^\d{2}/\d{2}/\d{4}$', USER_DATA.get('2', '')):  # Invalid DOB format
                CURRENT_STEP = '12'
            else:
                CURRENT_STEP = '10'  # Success
    else:
        # Replay the same question if not confirmed
        CURRENT_STEP = CURRENT_STEP  # Explicitly set to current step to replay
    return jsonify({'next_step': CURRENT_STEP})

# Placeholder for document and face verification (to be added later)
@api.route('/upload_document', methods=['POST'])
def upload_document():
    return jsonify({'message': 'Document upload placeholder', 'next_step': CURRENT_STEP})

@api.route('/verify_face', methods=['POST'])
def verify_face():
    return jsonify({'message': 'Face verification placeholder', 'next_step': CURRENT_STEP})