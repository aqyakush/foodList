# base image  
FROM python:3.8

RUN mkdir /backend 

# where your code lives  
WORKDIR /backend  

ENV PYTHONUNBUFFERED 1

# copy whole project to your docker home directory. 
COPY . /backend 

# run this command to install all dependencies  
RUN pip install --no-cache-dir -r requirements.txt

# port where the Django app runs  
EXPOSE 8000  
# start server  
CMD python manage.py migrate && python manage.py runserver 0.0.0.0:8000