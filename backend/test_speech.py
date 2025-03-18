import speech_recognition as sr
recognizer = sr.Recognizer()
with sr.AudioFile("test_audio_step2.wav") as source:
    audio = recognizer.record(source)
    try:
        text = recognizer.recognize_google(audio)
        print(text)
    except sr.RequestError as e:
        print(f"Request error: {e}")
    except sr.UnknownValueError:
        print("Could not understand audio")