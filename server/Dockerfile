FROM python:3.11.6-alpine

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /ecothone_server

COPY . /ecothone_server/
COPY requirements.txt /requirements.txt

RUN pip install -r /requirements.txt