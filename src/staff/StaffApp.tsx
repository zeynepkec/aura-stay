import type { ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { getStaff, tabsFor } from '../lib/staff'
import KitchenOrders from './KitchenOrders'
import StaffBills from './StaffBills'
import StaffFeedback from './StaffFeedback'
import StaffLayout from './StaffLayout'
import StaffLogin from './StaffLogin'
import StaffMenu from './StaffMenu'
import StaffPlaceholder from './StaffPlaceholder'
import StaffTables from './StaffTables'
import StaffTasks from './StaffTasks'

// Hazır olan ekranlar; olmayanlar "yakında" sayfasını gösterir
const SCREENS: Record<string, ReactNode> = {
  kitchen: <KitchenOrders />,
  menu: <StaffMenu />,
  tasks: <StaffTasks />,
  tables: <StaffTables />,
  bills: <StaffBills />,
  feedback: <StaffFeedback />,
}

export default function StaffApp() {
  const staff = getStaff()

  // Giriş yapılmamışsa: sadece PIN ekranı
  if (!staff) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<StaffLogin />} />
        </Routes>
      </BrowserRouter>
    )
  }

  const tabs = tabsFor(staff.role)
  const firstTab = `/staff/${tabs[0].key}`

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/staff" element={<StaffLayout staff={staff} />}>
          <Route index element={<Navigate to={firstTab} replace />} />
          {tabs.map((tab) => (
            <Route key={tab.key} path={tab.key} element={SCREENS[tab.key] ?? <StaffPlaceholder tab={tab.key} />} />
          ))}
        </Route>
        {/* Yetkisi olmayan ya da bilinmeyen adres → ilk sekme */}
        <Route path="*" element={<Navigate to={firstTab} replace />} />
      </Routes>
    </BrowserRouter>
  )
}