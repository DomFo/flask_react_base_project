# flask_react_base_project
A base project for a webapp using flask as the backend and react js as the frontend. Containerized using docker compose, with postgres db. 
React app created with vite. 


# # Run project for dev with
´docker compose up --build´
and frontend with 
´cd frontend && npm run dev´

# # Run test with
docker compose -f docker-compose.test.yml up --build --abort-on-container-exit