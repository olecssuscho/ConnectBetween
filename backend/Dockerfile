FROM python:3.14

WORKDIR /code

COPY requirements.txt /code/
RUN pip install --no-cache-dir -r requirements.txt

COPY app /code/app
CMD ["sh","-c","uvicorn app.main:app --host 0.0.0.0 --port 8080"]