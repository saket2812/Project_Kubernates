# Start with a Python image
FROM python:3.8-slim

# Set the working directory
WORKDIR /app

# Copy your application files into the container
ADD . .

# Install required Python packages
RUN pip install -r requirements.txt

# Alternatively, if you are installing directly:
# RUN pip install flask flask_cors pymongo

# Expose the port your app is running on

# Command to run the app
CMD ["python", "app.py"]
