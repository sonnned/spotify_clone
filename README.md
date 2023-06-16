<h1 align="center">SPOTIFY CLONE</h1>
<h2>Demo link</h2>
<p>You can access the demo of this project <a href="https://spotify-clone-nu-five.vercel.app/" blank="_target">here</a></p>
<p>Also you can access to the repository of the project <a href="https://github.com/sonnned/spotify_clone" blank="_target">here</a></p>
<h2>Description</h2>
<p>This project is a Music APP that use the Spotify web API to get the playlists of the logged user and play the songs of the playlist</p>
<p>Also you can listen a preview of the song selected from the playlist</p>
<h2>Technologies</h2>
<ul>
  <li>NexJS</li>
  <li>ReactJS</li>
  <li>Spotify Web API node</li>
  <li>TailwindCSS</li>
  <li>Lodash</li>
  <li>Heroicons</li>
  <li>Recoil</li>
  <li>Next-Auth</li>
</ul>
<h2>How to use</h2>
<p>First you need to create a Spotify APP in the <a href="https://developer.spotify.com/dashboard/login" blank="_target">Spotify Developer Dashboard</a></p>
<p>Then you need to create a .env.local file in the root of the project and add the following variables</p>

```bash
SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=YOUR_JWT_SECRET
```

<p>Then you need to install the dependencies of the project</p>

```bash
npm install
# or
yarn install
```

<p>Then you need to run the project</p>

```bash
npm run dev
# or
yarn dev
```

<p>Then you can access to the project in the following url <a href="http://localhost:3000" blank="_target">http://localhost:3000</a></p>


