import L from 'leaflet'

// Haritadaki numaralı durak işareti (koyu mavi)
export function numberIcon(n: number) {
  return L.divIcon({
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    html: `<span style="display:flex;width:28px;height:28px;align-items:center;justify-content:center;border-radius:9999px;background:#3C4C7F;color:#fff;border:2px solid #fff;font:700 12px 'Commissioner Variable',sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.3)">${n}</span>`,
  })
}

// Henüz eklenmemiş (seçilen) nokta
export const pendingIcon = L.divIcon({
  className: '',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  html: '<span style="display:block;width:28px;height:28px;border-radius:9999px;background:rgba(60,76,127,.15);border:3px solid #3C4C7F"></span>',
})

// Otelin konumu
export const hotelIcon = L.divIcon({
  className: '',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
  html: '<span style="display:block;width:22px;height:22px;border-radius:6px;background:#C5D1C5;border:2px solid #0A0A0A"></span>',
})
