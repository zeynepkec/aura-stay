import i18n from '../i18n'

i18n.addResourceBundle('tr', 'translation', {
  notify: {
    order: 'Sipariş #{{id}}',
    feedback: 'Geri bildirimin',
    close: 'Kapat',
    request: {
      pending: 'Talebin beklemeye alındı',
      in_progress: 'Talebinle ilgileniliyor',
      done: 'Talebin tamamlandı',
      confirmed: 'Masa talebin onaylandı',
      declined: 'Masa talebin maalesef onaylanamadı',
    },
    feedback_status: {
      new: 'Mesajın iletildi',
      seen: 'Mesajın resepsiyon tarafından görüldü',
      resolved: 'Mesajın çözüldü olarak işaretlendi',
    },
  },
}, true, true)

i18n.addResourceBundle('en', 'translation', {
  notify: {
    order: 'Order #{{id}}',
    feedback: 'Your feedback',
    close: 'Close',
    request: {
      pending: 'Your request is on hold',
      in_progress: 'Your request is being handled',
      done: 'Your request is complete',
      confirmed: 'Your table is confirmed',
      declined: 'Sorry, your table request could not be confirmed',
    },
    feedback_status: {
      new: 'Your message was sent',
      seen: 'Reception has seen your message',
      resolved: 'Your message was marked as resolved',
    },
  },
}, true, true)

i18n.addResourceBundle('el', 'translation', {
  notify: {
    order: 'Παραγγελία #{{id}}',
    feedback: 'Το μήνυμά σου',
    close: 'Κλείσιμο',
    request: {
      pending: 'Το αίτημά σου είναι σε αναμονή',
      in_progress: 'Το αίτημά σου εξυπηρετείται',
      done: 'Το αίτημά σου ολοκληρώθηκε',
      confirmed: 'Το τραπέζι σου επιβεβαιώθηκε',
      declined: 'Δυστυχώς το αίτημα τραπεζιού δεν επιβεβαιώθηκε',
    },
    feedback_status: {
      new: 'Το μήνυμά σου στάλθηκε',
      seen: 'Η ρεσεψιόν είδε το μήνυμά σου',
      resolved: 'Το μήνυμά σου επιλύθηκε',
    },
  },
}, true, true)