
echo "------------ Clonning the project"
git clone https://github.com/adrieellucas/code-challenge-shipix-tech.git

echo "------------ Entering the project folder"
cd code-challenge-shipix-tech

echo "------------ Installing project dependences"
npm install

echo "------------ Starting docker compose services"
docker-compose up -d

echo "------------ Starting application"
npm run start:dev

echo "------------ Config ok!"
