import cv2
import numpy as np
import requests
import os
from datetime import datetime

# API Configuration
BASE_URL = "http://localhost:5000/api"

def get_students():
    try:
        response = requests.get(f"{BASE_URL}/students?limit=100")
        if response.status_code == 200:
            return response.json().get('students', [])
        return []
    except Exception as e:
        print(f"Error fetching students: {e}")
        return []

def mark_attendance(student_name, course_id):
    try:
        payload = {
            "studentName": student_name,
            "course": course_id,
            "confidence": 0.95
        }
        response = requests.post(f"{BASE_URL}/face-recognition/mark", json=payload)
        return response.json()
    except Exception as e:
        print(f"Error marking attendance: {e}")
        return {"message": str(e)}

def recognize_faces():
    # In a real scenario, we would load trained embeddings
    # For this implementation, we provide the structure for OpenCV's LBPHFaceRecognizer
    # or a similar simple face recognizer that can be run locally.
    
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    cam = cv2.VideoCapture(0)
    
    print("Face Recognition Started. Press 'q' to quit.")
    
    while True:
        ret, frame = cam.read()
        if not ret:
            break
            
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)
            # Here we would call recognizer.predict(gray[y:y+h, x:x+w])
            # For demo purposes, we'll just label it
            cv2.putText(frame, "Scanning...", (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36,255,12), 2)
            
        cv2.imshow("Face Recognition Attendance System", frame)
        
        key = cv2.waitKey(1) & 0xFF
        if key == ord('q'):
            break
            
    cam.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    recognize_faces()
