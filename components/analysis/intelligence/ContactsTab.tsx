import { keyContacts } from '@/lib/intelligence-data';
import { ContactIcon } from '@/components/Icons';

export default function ContactsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--glacial-800)' }}>
        <ContactIcon size={24} color="var(--glacial-500)" /> Key Contacts for Follow-Up
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {keyContacts.map((contact, i) => (
          <div key={i} className="p-4 rounded-xl border flex items-start gap-4" style={{ background: 'white', borderColor: 'var(--glacial-200)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold" style={{ background: 'var(--glacial-100)', color: 'var(--glacial-600)' }}>
              {contact.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold" style={{ color: 'var(--glacial-700)' }}>{contact.name}</h3>
                {contact.priority === 'high' && (
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--glacial-500)', color: 'white' }}>
                    Priority
                  </span>
                )}
              </div>
              <p className="text-sm" style={{ color: 'var(--sage-600)' }}>{contact.organization}</p>
              <p className="text-sm mt-1" style={{ color: '#111827' }}>
                <span style={{ color: 'var(--sage-500)' }}>Opportunity:</span> {contact.opportunity}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
