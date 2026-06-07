import { useMemo, useState, type ReactNode } from 'react';
import { Badge, Button, Icon } from '../../components';
import { checkoutAssets } from '../assets/checkout';
import {
  addresses,
  billLines,
  days,
  money,
  patients,
  services,
  slots,
  tests,
  type Address,
  type Patient,
  type Preparation,
  type TestItem,
} from './data';
import styles from './CheckoutApp.module.css';

type Sheet = 'patients' | 'add-patient' | 'slot' | 'booking' | null;
type Page = 'cart' | 'address';
type PreviewMode = 'checkout' | 'prep-sheet-v2';

export function CheckoutApp() {
  const [previewMode, setPreviewMode] = useState<PreviewMode>('checkout');
  const [page, setPage] = useState<Page>('cart');
  const [sheet, setSheet] = useState<Sheet>(null);
  const [selectedPatientIds, setSelectedPatientIds] = useState<string[]>(['saumya']);
  const [selectedAddressId, setSelectedAddressId] = useState('home');
  const [selectedSlotId, setSelectedSlotId] = useState('morning-7');
  const [selectedServices, setSelectedServices] = useState<string[]>(['hard-copy']);
  const [selectedDayId, setSelectedDayId] = useState('today');
  const [billOpen, setBillOpen] = useState(false);
  const [addressReturnSheet, setAddressReturnSheet] = useState<Sheet>('booking');

  const selectedPatients = patients.filter((patient) => selectedPatientIds.includes(patient.id));
  const selectedAddress = addresses.find((address) => address.id === selectedAddressId) ?? addresses[0];
  const selectedSlot = slots.find((slot) => slot.id === selectedSlotId) ?? slots[0];

  const totals = useMemo(() => {
    const serviceTotal = services
      .filter((service) => selectedServices.includes(service.id))
      .reduce((sum, service) => sum + service.price, 0);
    const subtotal = tests.reduce((sum, test) => sum + test.price, 0);
    const slotCharge = selectedSlot.surcharge;
    return {
      amount: subtotal + serviceTotal + slotCharge - 50,
      original: tests.reduce((sum, test) => sum + test.mrp, 0) + serviceTotal + slotCharge,
      items: tests.length,
    };
  }, [selectedServices, selectedSlot.surcharge]);

  const openAddressPicker = (returnSheet: Sheet) => {
    setAddressReturnSheet(returnSheet);
    setSheet(null);
    setPage('address');
  };

  const returnFromAddress = () => {
    setPage('cart');
    setSheet(addressReturnSheet);
  };

  const showCheckout = () => {
    setPreviewMode('checkout');
  };

  const showPrepSheetV2 = () => {
    setPreviewMode('prep-sheet-v2');
    setPage('cart');
    setSheet(null);
  };

  return (
    <div className={styles.previewFrame}>
      <div className={styles.previewControls} aria-label="Preview mode">
        <button className={previewMode === 'checkout' ? styles.previewActive : ''} onClick={showCheckout}>
          Current checkout
        </button>
        <button className={previewMode === 'prep-sheet-v2' ? styles.previewActive : ''} onClick={showPrepSheetV2}>
          Prep Guide Sheet v2
        </button>
      </div>

      <div className={styles.app} aria-label="Diagnostics checkout prototype">
        {page === 'cart' ? (
          <CartPage
            totals={totals}
            selectedServices={selectedServices}
            onToggleService={(id) =>
              setSelectedServices((current) =>
                current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
              )
            }
            onContinue={() => setSheet('patients')}
          />
        ) : (
          <ChooseAddressPage
            selectedAddressId={selectedAddressId}
            onSelect={setSelectedAddressId}
            onBack={returnFromAddress}
          />
        )}

        {previewMode === 'checkout' && sheet === 'patients' && (
          <BottomSheet title="Select patient" onBack={() => setSheet(null)} onClose={() => setSheet(null)}>
            <SelectPatientSheet
              selectedPatientIds={selectedPatientIds}
              onTogglePatient={(id) =>
                setSelectedPatientIds((current) =>
                  current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
                )
              }
              onAddPatient={() => setSheet('add-patient')}
              onContinue={() => setSheet('slot')}
            />
          </BottomSheet>
        )}

        {previewMode === 'checkout' && sheet === 'add-patient' && (
          <BottomSheet title="Add a new patient" onBack={() => setSheet('patients')} onClose={() => setSheet(null)}>
            <AddPatientSheet
              onSave={() => {
                setSelectedPatientIds((current) => (current.includes('anita') ? current : [...current, 'anita']));
                setSheet('patients');
              }}
            />
          </BottomSheet>
        )}

        {previewMode === 'checkout' && sheet === 'slot' && (
          <BottomSheet title="Select slot" onBack={() => setSheet('patients')} onClose={() => setSheet(null)}>
            <SelectSlotSheet
              address={selectedAddress}
              patients={selectedPatients}
              selectedDayId={selectedDayId}
              selectedSlotId={selectedSlotId}
              onSelectDay={setSelectedDayId}
              onSelectSlot={setSelectedSlotId}
              onChangeAddress={() => openAddressPicker('slot')}
              onConfirm={() => setSheet('booking')}
            />
          </BottomSheet>
        )}

        {previewMode === 'checkout' && sheet === 'booking' && (
          <BottomSheet title="Booking details" onBack={() => setSheet('slot')} onClose={() => setSheet(null)}>
            <BookingDetailsSheet
              address={selectedAddress}
              patients={selectedPatients}
              slot={selectedSlot}
              total={totals.amount}
              billOpen={billOpen}
              onToggleBill={() => setBillOpen((open) => !open)}
              onChangeAddress={() => openAddressPicker('booking')}
              onChangePatient={() => setSheet('patients')}
              onChangeSlot={() => setSheet('slot')}
            />
          </BottomSheet>
        )}

        {previewMode === 'prep-sheet-v2' && <PrepGuideSheetV2 onClose={showCheckout} />}
      </div>
    </div>
  );
}

function CartPage({
  totals,
  selectedServices,
  onToggleService,
  onContinue,
}: {
  totals: { amount: number; original: number; items: number };
  selectedServices: string[];
  onToggleService: (id: string) => void;
  onContinue: () => void;
}) {
  return (
    <div className={styles.page}>
      <AppHeader title="Cart" trailing="search" />
      <SavingsBanner savings={totals.original - totals.amount} />
      <Divider />
      <section className={styles.section}>
        <PreparationAlertBanner
          heading="Fasting required before collection"
          body="Avoid food and calorie drinks for 8-12 hrs before your sample collection appointment."
        />
      </section>
      <Divider />
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{tests.length} Tests added</h2>
        <BrandPill />
        <div style={{ display: 'grid', gap: '12px', marginTop: 12 }}>
          {tests.map((test) => (
            <LabTestCard key={test.id} test={test} />
          ))}
        </div>
      </section>
      <Divider />
      <Carousel title="Previously booked by you" />
      <Divider />
      <Carousel title="Frequently booked together" />
      <Divider />
      <section className={styles.section}>
        <CouponWidget />
      </section>
      <Divider />
      <section className={styles.section}>
        <NeuCoinsWidget />
      </section>
      <Divider />
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Additional services</h2>
        <p className={styles.meta}>Add services for a better experience</p>
        {services.map((service) => (
          <ServiceRow
            key={service.id}
            selected={selectedServices.includes(service.id)}
            service={service}
            onToggle={() => onToggleService(service.id)}
          />
        ))}
      </section>
      <Divider />
      <section className={styles.section}>
        <BillSummary total={totals.amount} />
      </section>
      <StickyBottomBar
        amount={totals.amount}
        subLabel={`Total for ${totals.items} items`}
        cta="Continue"
        onClick={onContinue}
      />
    </div>
  );
}

function ChooseAddressPage({
  selectedAddressId,
  onSelect,
  onBack,
}: {
  selectedAddressId: string;
  onSelect: (id: string) => void;
  onBack: () => void;
}) {
  return (
    <div className={styles.page}>
      <AppHeader title="Choose address" onBack={onBack} />
      <section className={styles.section}>
        <Button variant="outline.primary" fullWidth>
          Add new address
        </Button>
      </section>
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <p className={styles.meta}>Recent address</p>
        <div className={styles.addressList} style={{ margin: 0 }}>
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              selected={address.id === selectedAddressId}
              onSelect={() => onSelect(address.id)}
            />
          ))}
        </div>
      </section>
      <StickyBottomBar cta="Continue" onClick={onBack} />
    </div>
  );
}

function SelectPatientSheet({
  selectedPatientIds,
  onTogglePatient,
  onAddPatient,
  onContinue,
}: {
  selectedPatientIds: string[];
  onTogglePatient: (id: string) => void;
  onAddPatient: () => void;
  onContinue: () => void;
}) {
  return (
    <>
      <div className={styles.sheetScroll}>
        {tests.map((test, index) => (
          <div className={`${styles.card} ${styles.accordion}`} key={test.id}>
            <button className={styles.accordionHeader}>
              <span>
                <span className={styles.testName}>{test.name}</span>
                <span className={styles.meta}>
                  {selectedPatientIds.length ? `${selectedPatientIds.length} patient selected` : 'Select patient'}
                </span>
              </span>
              <Icon name={index === 0 ? 'chevron-up' : 'chevron-down'} size={20} />
            </button>
            {index === 0 && (
              <div className={styles.accordionBody}>
                {patients.map((patient) => (
                  <PatientRow
                    key={patient.id}
                    patient={patient}
                    selected={selectedPatientIds.includes(patient.id)}
                    onToggle={() => onTogglePatient(patient.id)}
                  />
                ))}
                <button className={styles.addPatient} onClick={onAddPatient}>
                  + Add new patient
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      <StickyBottomBar cta="Proceed to slot selection" onClick={onContinue} />
    </>
  );
}

function AddPatientSheet({ onSave }: { onSave: () => void }) {
  return (
    <>
      <div className={styles.sheetScroll}>
        <form className={styles.form}>
          <Field label="Patient Name" placeholder="Patient Name" />
          <div className={styles.formRow}>
            <Field label="Date of birth" placeholder="DD-MM-YYYY" />
            <label className={styles.field}>
              <span>Gender</span>
              <select className={styles.input} defaultValue="Female">
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </label>
          </div>
        </form>
      </div>
      <StickyBottomBar cta="Save" onClick={onSave} />
    </>
  );
}

function SelectSlotSheet({
  address,
  patients: selectedPatients,
  selectedDayId,
  selectedSlotId,
  onSelectDay,
  onSelectSlot,
  onChangeAddress,
  onConfirm,
}: {
  address: Address;
  patients: Patient[];
  selectedDayId: string;
  selectedSlotId: string;
  onSelectDay: (id: string) => void;
  onSelectSlot: (id: string) => void;
  onChangeAddress: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
      <div className={styles.sheetScroll}>
        <div className={`${styles.card} ${styles.summaryGroup}`}>
          <SummaryRow
            type="address"
            label="Sample collection address"
            value={address.address}
            onChange={onChangeAddress}
          />
          <SummaryRow
            type="patient"
            label="Patient"
            value={selectedPatients.map((patient) => patient.name).join(', ')}
          />
        </div>
        <div className={`${styles.card} ${styles.slotCard}`}>
          <div className={styles.hScroll}>
            {days.map((day) => (
              <button
                key={day.id}
                className={[
                  styles.dayPill,
                  selectedDayId === day.id && styles.daySelected,
                  day.disabled && styles.dayDisabled,
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={day.disabled}
                onClick={() => onSelectDay(day.id)}
              >
                <strong>{day.label}</strong>
                <br />
                <span>{day.sublabel}</span>
              </button>
            ))}
          </div>
          <SlotGroup period="morning" selectedSlotId={selectedSlotId} onSelectSlot={onSelectSlot} highDemand />
          <SlotGroup period="afternoon" selectedSlotId={selectedSlotId} onSelectSlot={onSelectSlot} />
          <SlotGroup period="evening" selectedSlotId={selectedSlotId} onSelectSlot={onSelectSlot} />
        </div>
      </div>
      <StickyBottomBar cta="Confirm slot" onClick={onConfirm} />
    </>
  );
}

function BookingDetailsSheet({
  address,
  patients: selectedPatients,
  slot,
  total,
  billOpen,
  onToggleBill,
  onChangeAddress,
  onChangePatient,
  onChangeSlot,
}: {
  address: Address;
  patients: Patient[];
  slot: { time: string };
  total: number;
  billOpen: boolean;
  onToggleBill: () => void;
  onChangeAddress: () => void;
  onChangePatient: () => void;
  onChangeSlot: () => void;
}) {
  return (
    <>
      <div className={styles.sheetScroll}>
        <div className={`${styles.card} ${styles.summaryGroup}`}>
          <SummaryRow
            type="address"
            label="Sample collection address"
            value={address.address}
            onChange={onChangeAddress}
          />
          <SummaryRow
            type="patient"
            label="Patient"
            value={selectedPatients.map((patient) => patient.name).join(', ')}
            onChange={onChangePatient}
          />
          <SummaryRow type="calendar" label="Sample collection slot" value={`Today, ${slot.time}`} onChange={onChangeSlot} />
        </div>
        <div className={`${styles.card} ${styles.inlineExpander}`}>
          <button className={styles.expanderButton} onClick={onToggleBill}>
            <span>
              To be paid <Icon name={billOpen ? 'chevron-up' : 'chevron-down'} size={16} />
            </span>
            <span>{money(total)}</span>
          </button>
          {billOpen && (
            <div className={styles.expandedContent}>
              <BillSummary total={total} />
            </div>
          )}
        </div>
      </div>
      <StickyBottomBar amount={total} subLabel="To be paid" cta="Proceed to pay" onClick={() => undefined} />
    </>
  );
}

function AppHeader({ title, trailing, onBack }: { title: string; trailing?: 'search'; onBack?: () => void }) {
  return (
    <header className={styles.header}>
      <button className={styles.iconButton} aria-label="Go back" onClick={onBack}>
        <Icon name="chevron-left" size={24} />
      </button>
      <h1 className={styles.headerTitle}>{title}</h1>
      {trailing ? (
        <button className={styles.iconButton} aria-label="Search">
          <Icon name="search" size={22} />
        </button>
      ) : (
        <span />
      )}
    </header>
  );
}

function BottomSheet({
  title,
  children,
  onBack,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onBack: () => void;
  onClose: () => void;
}) {
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label={title}>
      <div className={styles.sheet}>
        <div className={styles.sheetChrome}>
          <button className={styles.floatingButton} aria-label="Back" onClick={onBack}>
            <Icon name="chevron-left" size={20} />
          </button>
          <button className={styles.floatingButton} aria-label="Close" onClick={onClose}>
            <Icon name="cross" size={18} />
          </button>
        </div>
        <div className={styles.sheetHeader}>{title}</div>
        {children}
      </div>
    </div>
  );
}

function PrepGuideSheetV2({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.prepV2Overlay} role="dialog" aria-modal="true" aria-label="Preparation guide">
      <div className={styles.prepV2Chrome}>
        <button className={styles.floatingButton} aria-label="Back" onClick={onClose}>
          <Icon name="chevron-left" size={20} />
        </button>
        <button className={styles.floatingButton} aria-label="Close" onClick={onClose}>
          <Icon name="cross" size={18} />
        </button>
      </div>
      <section className={styles.prepV2Sheet}>
        <div className={styles.prepV2Handle} />
        <header className={styles.prepV2Header}>
          <h2>Preparation guide</h2>
          <p>Familiarise yourself with required preparation for your upcoming lab tests</p>
        </header>
        <div className={styles.prepV2Content}>
          <PrepGuideV2Group
            title="Comprehensive Gold Full Body Checkup"
            rows={[
              {
                glyph: '🍴',
                text: 'Overnight fasting (8-12 hrs). Do not eat or drink anything except water before the test.',
              },
              {
                glyph: '💊',
                text: 'Avoid iron supplements for at least 24 hours prior to sample collection.',
              },
              {
                glyph: '🧪',
                text: 'Collect first morning midstream urine sample in a clean, sterile container.',
              },
            ]}
          />
          <div className={styles.prepV2Divider} />
          <PrepGuideV2Group
            title="Mean Corpuscular Volume (MCV)"
            rows={[{ glyph: '✓', success: true, text: 'No special preparation required.' }]}
          />
        </div>
        <div className={styles.prepV2Footer}>
          <Button className={styles.prepV2Cta} fullWidth onClick={onClose}>
            Okay, I understand
          </Button>
        </div>
      </section>
    </div>
  );
}

function PrepGuideV2Group({ title, rows }: { title: string; rows: Array<{ glyph: string; text: string; success?: boolean }> }) {
  return (
    <section className={styles.prepV2Group}>
      <h3>{title}</h3>
      {rows.map((row) => (
        <div className={`${styles.prepV2Row} ${row.success ? styles.prepV2Success : ''}`} key={row.text}>
          <span className={styles.prepV2Glyph} aria-hidden="true">
            {row.glyph}
          </span>
          <span>{row.text}</span>
        </div>
      ))}
    </section>
  );
}

function SavingsBanner({ savings }: { savings: number }) {
  return (
    <div className={styles.savings}>
      <div>
        <strong>{money(savings)} saved</strong>
        <span>on this order</span>
      </div>
      <img src={checkoutAssets.savingsCoin} alt="" width={34} height={34} />
    </div>
  );
}

function PreparationAlertBanner({ heading, body }: { heading: string; body: string }) {
  return (
    <div className={styles.prepAlert} role="note" aria-label="Test preparation required">
      <Icon name="timer" size={20} />
      <div>
        <strong className={styles.prepAlertTitle}>{heading}</strong>
        <p className={styles.prepAlertBody}>{body}</p>
      </div>
    </div>
  );
}

function BrandPill() {
  return (
    <span className={styles.brandPill} aria-label="Fulfilled by TATA 1mg Labs">
      <span>Fulfilled by</span>
      <img src={checkoutAssets.tataLabs} alt="TATA 1mg Labs" width={82} height={14} />
      <img src={checkoutAssets.info} alt="" width={16} height={16} />
    </span>
  );
}

function LabTestCard({ test }: { test: TestItem }) {
  return (
    <article className={`${styles.card} ${styles.labCard}`}>
      <div className={styles.labTop}>
        <img className={styles.labImage} src={checkoutAssets.labTestBlood} alt="" />
        <div>
          <h3 className={styles.testName}>{test.name}</h3>
          <p className={styles.meta}>{test.fasting}</p>
          <p className={styles.meta}>{test.reportTime}</p>
        </div>
        <Stepper count={test.patients} />
      </div>
      <div className={styles.priceRow}>
        <span className={styles.price}>{money(test.price)}</span>
        <span className={styles.mrp}>{money(test.mrp)}</span>
        <span className={styles.discount}>{test.discount}</span>
      </div>
      <PreparationGuide preparations={test.preparations} />
    </article>
  );
}

function PreparationGuide({ preparations }: { preparations: Preparation[] }) {
  return (
    <div className={styles.prep} aria-label="Preparations guide">
      <h4 className={styles.prepHeading}>Preparations guide</h4>
      {preparations.map((preparation) => (
        <div
          className={`${styles.prepRow} ${preparation.icon === 'tick' ? styles.prepSuccess : ''}`}
          key={preparation.id}
        >
          <Icon name={preparation.icon} size={16} />
          <span>{preparation.text}</span>
        </div>
      ))}
    </div>
  );
}

function Stepper({ count }: { count: number }) {
  return (
    <span className={styles.stepper} aria-label={`${count} patients`}>
      <button aria-label="Decrease">-</button>
      <span>{count}</span>
      <button aria-label="Increase">+</button>
    </span>
  );
}

function Carousel({ title }: { title: string }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.carousel}>
        {tests.map((test) => (
          <article className={`${styles.card} ${styles.miniCard}`} key={test.id}>
            <h3 className={styles.testName}>{test.name}</h3>
            <p className={styles.meta}>{test.reportTime}</p>
            <div className={styles.priceRow}>
              <span className={styles.price}>{money(test.price)}</span>
              <span className={styles.discount}>{test.discount}</span>
            </div>
            <button className={styles.miniButton}>Add</button>
          </article>
        ))}
      </div>
    </section>
  );
}

function CouponWidget() {
  return (
    <button className={`${styles.card} ${styles.tapRow}`}>
      <img src={checkoutAssets.couponTag} alt="" width={36} height={36} />
      <span className={styles.couponText}>
        <strong>FIRST50 applied</strong>
        <span>You saved {money(50)} on this order</span>
      </span>
      <Icon name="chevron-right" size={18} color="var(--color-brand-1mg)" />
    </button>
  );
}

function NeuCoinsWidget() {
  return (
    <article className={`${styles.card} ${styles.neu}`}>
      <div className={styles.neuMain}>
        <div className={styles.neuTop}>
          <span className={styles.neuLogoText}>
            <img src={checkoutAssets.neucoins} alt="" width={28} height={28} />
            Redeem my NeuCoins
          </span>
          <button className={styles.toggle} aria-label="Redeem NeuCoins">
            <span />
          </button>
        </div>
        <p className={styles.meta}>Your balance: 200 NeuCoins</p>
        <p className={styles.testName}>Total: 200 NeuCoins = {money(200)}</p>
      </div>
      <div className={styles.earned}>
        <img src={checkoutAssets.checkWhite} alt="" width={12} height={12} />
        14 NeuCoins earned on this order
      </div>
    </article>
  );
}

function ServiceRow({ service, selected, onToggle }: { service: (typeof services)[number]; selected: boolean; onToggle: () => void }) {
  return (
    <button
      className={`${styles.serviceRow} ${selected ? styles.serviceSelected : ''}`}
      role="checkbox"
      aria-checked={selected}
      onClick={onToggle}
    >
      <img className={styles.serviceIcon} src={service.asset} alt="" />
      <span>
        <span className={styles.serviceTitle}>
          {service.title}
          <img src={checkoutAssets.info} alt="" width={16} height={16} />
        </span>
        <span className={styles.meta}>{service.description}</span>
        <span className={styles.priceRow}>
          <span className={styles.price}>{money(service.price)}</span>
          {service.oldPrice && <span className={styles.mrp}>{money(service.oldPrice)}</span>}
          {service.discount && <span className={styles.discount}>{service.discount}</span>}
        </span>
      </span>
      <CheckBox checked={selected} />
    </button>
  );
}

function BillSummary({ total }: { total: number }) {
  return (
    <article className={`${styles.card} ${styles.bill}`}>
      <h3>Bill summary</h3>
      {billLines.map((line) => (
        <div className={styles.billLine} key={line.label}>
          <span className={styles.subtle}>{line.label}</span>
          <span className={line.value < 0 ? styles.negative : undefined}>{money(line.value)}</span>
        </div>
      ))}
      <div className={styles.totalLine}>
        <span>Total</span>
        <span>{money(total)}</span>
      </div>
    </article>
  );
}

function PatientRow({ patient, selected, onToggle }: { patient: Patient; selected: boolean; onToggle: () => void }) {
  return (
    <button className={styles.patientRow} onClick={onToggle} aria-pressed={selected}>
      <img className={styles.avatar} src={patient.avatar} alt={`${patient.name}, ${patient.meta}`} />
      <span>
        <span className={styles.patientName}>{patient.name}</span>
        <span className={styles.meta}>{patient.meta}</span>
      </span>
      <CheckBox checked={selected} />
    </button>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input className={styles.input} placeholder={placeholder} />
    </label>
  );
}

function SummaryRow({
  type,
  label,
  value,
  onChange,
}: {
  type: 'address' | 'patient' | 'calendar';
  label: string;
  value: string;
  onChange?: () => void;
}) {
  const icon =
    type === 'address' ? checkoutAssets.summaryAddress : type === 'calendar' ? checkoutAssets.summaryCalendar : checkoutAssets.avatarFemale;
  return (
    <div className={styles.summaryRow}>
      <img className={styles.summaryIcon} src={icon} alt="" />
      <span>
        <span className={styles.summaryLabel}>{label}</span>
        <span className={styles.summaryValue}>{value}</span>
      </span>
      {onChange && (
        <button className={styles.textAction} onClick={onChange}>
          Change <Icon name="chevron-right" size={14} />
        </button>
      )}
    </div>
  );
}

function SlotGroup({
  period,
  selectedSlotId,
  onSelectSlot,
  highDemand = false,
}: {
  period: string;
  selectedSlotId: string;
  onSelectSlot: (id: string) => void;
  highDemand?: boolean;
}) {
  const periodSlots = slots.filter((slot) => slot.period === period);
  const icon =
    period === 'morning'
      ? checkoutAssets.weatherMorning
      : period === 'afternoon'
        ? checkoutAssets.weatherAfternoon
        : checkoutAssets.weatherEvening;
  return (
    <>
      <div className={styles.slotHeader}>
        <img src={icon} alt="" />
        <span style={{ flex: 1 }}>{period[0].toUpperCase() + period.slice(1)}</span>
        {highDemand && (
          <Badge type="info" variant="success">
            High demand
          </Badge>
        )}
      </div>
      {periodSlots.map((slot) => (
        <button className={styles.slotRow} key={slot.id} onClick={() => onSelectSlot(slot.id)}>
          <Radio checked={selectedSlotId === slot.id} />
          <span>{slot.time}</span>
          {slot.surcharge > 0 && <span className={styles.discount}>+{money(slot.surcharge)}</span>}
        </button>
      ))}
    </>
  );
}

function AddressCard({ address, selected, onSelect }: { address: Address; selected: boolean; onSelect: () => void }) {
  return (
    <button className={`${styles.card} ${styles.addressCard}`} onClick={onSelect} aria-pressed={selected}>
      <Radio checked={selected} />
      <span>
        <span className={styles.addressLabel}>{address.label}</span>
        <span className={styles.meta}>{address.address}</span>
        <span className={styles.patientName}>{address.person}</span>
        <span className={styles.meta}>{address.phone}</span>
        <span className={styles.addressActions}>
          <span className={styles.textAction}>Edit</span>
          <span className={styles.textAction}>Remove</span>
        </span>
      </span>
    </button>
  );
}

function StickyBottomBar({
  amount,
  subLabel,
  cta,
  onClick,
}: {
  amount?: number;
  subLabel?: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <div className={styles.stickyBar}>
      {amount !== undefined && (
        <div className={styles.barLeft}>
          <span className={styles.barAmount}>{money(amount)}</span>
          {subLabel && <span className={styles.barSub}>{subLabel}</span>}
        </div>
      )}
      <div className={amount === undefined ? styles.barFull : styles.barCta}>
        <Button fullWidth onClick={onClick}>
          {cta}
        </Button>
      </div>
    </div>
  );
}

function CheckBox({ checked }: { checked: boolean }) {
  return (
    <span className={[styles.checkBox, checked && styles.checked].filter(Boolean).join(' ')} aria-hidden="true">
      {checked && <Icon name="tick" size={14} color="currentColor" />}
    </span>
  );
}

function Radio({ checked }: { checked: boolean }) {
  return <span className={[styles.radio, checked && styles.radioSelected].filter(Boolean).join(' ')} aria-hidden="true" />;
}

function Divider() {
  return <div className={styles.divider} />;
}
