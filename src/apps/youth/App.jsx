import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import Landing from './screens/Landing.jsx'
import HomeFeed from './screens/HomeFeed.jsx'
import FindPeers from './screens/FindPeers.jsx'
import CivicPortfolio from './screens/CivicPortfolio.jsx'
import PostPage from './screens/PostPage.jsx'
import Programs from './screens/Programs.jsx'
import PeerProfile from './screens/PeerProfile.jsx'

export default function App() {
  const [userPrefs, setUserPrefs] = useState({
    interests: [],
    location: 'Phoenix, AZ',
    ageBracket: '16–17',
  })

  return (
    <Routes>
      <Route index element={<Landing setUserPrefs={setUserPrefs} />} />
      <Route path="feed" element={<HomeFeed userPrefs={userPrefs} />} />
      <Route path="peers" element={<FindPeers userPrefs={userPrefs} />} />
      <Route path="peers/:id" element={<PeerProfile />} />
      <Route path="portfolio" element={<CivicPortfolio />} />
      <Route path="posts/:id" element={<PostPage />} />
      <Route path="programs" element={<Programs />} />
      <Route path="*" element={<Navigate to="/youth" replace />} />
    </Routes>
  )
}
