## Getting Started
1. clone repo `git clone https://github.com/pkong-ds/social_media_trends_display.git && cd social_media_trends_display`
2. run `cd backend/ && npm i && cd ../client && npm i && cd ..`
3. \[IMPORTANT\] copy & paste provided `.env` file to `backend/`
4. run `cd backend/ && node server.js`
5. open a new terminal tab, run `cd client/ && npm run dev`
6. go to `http://localhost:3000/` to check out the app!

## Demo
<img width="1434" alt="Screenshot 2022-02-22 at 11 17 58 PM" src="https://user-images.githubusercontent.com/74223769/155229051-902f9cb2-7c60-4aba-9183-6ec93813086d.png">

## Potential Improvements 
1. should limit to one database connection at a time
2. `3000ms` delay to read database seem too long, should optimize without `setTimeout` approach
3. countless additional features, real-time graph trends of different items, image preview, etc.
4. code quality: three apis codes are actually very similar, to uphold DRY, should refactor as a new component and pass `type: twitter | google | reddit` as props
 



