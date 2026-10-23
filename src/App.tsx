import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import StaffApp from './staff/StaffApp'
import { getSession } from './lib/session'
import Assistant from './pages/Assistant'
import Bill from './pages/Bill'
import Cart from './pages/Cart'
import Dining from './pages/Dining'
import Explore from './pages/Explore'
import Home from './pages/Home'
import Join from './pages/Join'
import MemoryCard from './pages/MemoryCard'
import QrCodes from './pages/QrCodes'
import OrderDetail from './pages/OrderDetail'
import Review from './pages/Review'
import RouteDetail from './pages/RouteDetail'
import ServiceRequest from './pages/ServiceRequest'
import Services from './pages/Services'
import Stay from './pages/Stay'
import Welcome from './pages/Welcome'
import { FeedbackProvider } from './store/FeedbackContext'
import { ServiceProvider } from './store/ServiceContext'
import { StayProvider } from './store/StayContext'

export default function App() {
    // Personel paneli: /staff ile başlayan adresler
  if (window.location.pathname.startsWith('/staff')) return <StaffApp />
  
  const session = getSession()

  // Giriş yapılmamışsa: sadece karşılama ekranı ve QR linki açılabilir
  if (!session) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/qr" element={<QrCodes />} />
          <Route path="/join" element={<Join />} />
          <Route path="*" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    )
  }

  // Giriş yapılmışsa: uygulamanın tamamı
  return (
    <StayProvider>
      <ServiceProvider>
        <FeedbackProvider>
          <BrowserRouter>
            <div className="mx-auto min-h-screen max-w-[430px] bg-background pb-24">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/qr" element={<QrCodes />} />
                <Route path="/join" element={<Join />} />
                <Route path="/dining" element={<Dining />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders/:orderId" element={<OrderDetail />} />
                <Route path="/assistant" element={<Assistant />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/explore/:routeId" element={<RouteDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:type" element={<ServiceRequest />} />
                <Route path="/stay" element={<Stay />} />
                <Route path="/stay/bill" element={<Bill />} />
                <Route path="/stay/review" element={<Review />} />
                <Route path="/stay/memory" element={<MemoryCard />} />
              </Routes>
            </div>
            <BottomNav />
          </BrowserRouter>
        </FeedbackProvider>
      </ServiceProvider>
    </StayProvider>
  )
}