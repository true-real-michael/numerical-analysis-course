FROM python:3
FROM node:16


WORKDIR /app

COPY . .

RUN python3 -m pip install --no-cache-dir -r requirements.txt
RUN cd front && npm i

EXPOSE 3000
EXPOSE 5000

ENTRYPOINT ["bash", "run.sh"]