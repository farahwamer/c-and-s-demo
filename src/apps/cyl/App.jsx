import { Routes, Route } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import Teams from './components/Teams'
import ApplicationReview from './components/ApplicationReview'
import FunderReport from './components/FunderReport'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="teams" element={<Teams />} />
        <Route path="applications" element={<ApplicationReview />} />
        <Route path="reports" element={<FunderReport />} />
      </Route>
    </Routes>
  )
}
