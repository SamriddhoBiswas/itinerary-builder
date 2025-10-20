import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TourOverviewForm } from "@/components/TourOverviewForm";
import { DayBuilder } from "@/components/DayBuilder";
import { HotelManager } from "@/components/HotelManager";
import { PaymentPlanBuilder } from "@/components/PaymentPlanBuilder";
import { InclusionsExclusions } from "@/components/InclusionsExclusions";
import { ItineraryData } from "@/types/itinerary";
import { generatePDF } from "@/utils/pdfGenerator";
import { FileDown, Plane } from "lucide-react";
import { toast } from "sonner";
import vigoviaLogo from "@/assets/vigovia-logo.png";

const Index = () => {
  const [itinerary, setItinerary] = useState<ItineraryData>({
    tourOverview: {
      title: "Singapore Itinerary",
      duration: "4 Days 3 Nights",
      travelers: 4,
      departureDate: "2025-10-31",
      returnDate: "2025-11-01",
      departureCity: "Mumbai",
      arrivalCity: "Singapore",
      customerName: "Rahul",
      departureFrom: "Mumbai",
      destination: "Singapore",
    },
    days: [
      {
        id: "day-1",
        dayNumber: 1,
        title: "Arrival In Singapore & City Exploration",
        date: "27th November",
        activities: [
          { time: 'morning', description: 'Arrive In Singapore. Transfer From Airport To Hotel.' },
          { time: 'afternoon', description: 'Check Into Your Hotel.\nVisit Marina Bay Sands Sky Park (2-3 Hours).\nOptional: Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge.' },
          { time: 'evening', description: 'Explore Gardens By The Bay, Including Super Tree Grove (3-4 Hours)' },
        ],
      },
      {
        id: "day-2",
        dayNumber: 2,
        title: "Singapore City Excursion",
        date: "27th November",
        activities: [
          { time: 'morning', description: 'Arrive In Singapore. Transfer From Airport To Hotel.' },
          { time: 'afternoon', description: 'Check Into Your Hotel.\nVisit Marina Bay Sands Sky Park (2-3 Hours).\nOptional: Stroll Along Marina Bay Waterfront Promenade Or Helix Bridge.' },
          { time: 'evening', description: 'Explore Gardens By The Bay, Including Super Tree Grove (3-4 Hours)' },
        ],
      },
      {
        id: "day-3",
        dayNumber: 3,
        title: "Gardens By The Bay + Marina Bay",
        date: "27th November",
        activities: [
          { time: 'morning', description: 'Arrive In Singapore. Transfer From Airport To Hotel.' },
          { time: 'afternoon', description: 'Check Into Your Hotel.\nVisit Marina Bay Sands Sky Park (2-3 Hours).' },
          { time: 'evening', description: 'Explore Gardens By The Bay, Including Super Tree Grove (3-4 Hours)' },
        ],
      },
      {
        id: "day-4",
        dayNumber: 4,
        title: "Arrive In Genting And Relax",
        date: "27th November",
        activities: [
          { time: 'morning', description: 'Arrive In Singapore. Transfer From Airport To Hotel.' },
          { time: 'afternoon', description: 'Check Into Your Hotel.\nVisit Marina Bay Sands Sky Park (2-3 Hours).' },
          { time: 'evening', description: 'Explore Gardens By The Bay, Including Super Tree Grove (3-4 Hours)' },
        ],
      },
    ],
    hotels: [
      {
        id: "hotel-1",
        name: "Super Townhouse Oak Vashi Formerly Blue Diamond",
        city: "Singapore",
        checkIn: "2024-02-24",
        checkOut: "2024-02-24",
        nights: 2,
      },
      {
        id: "hotel-2",
        name: "Super Townhouse Oak Vashi Formerly Blue Diamond",
        city: "Singapore",
        checkIn: "2024-02-24",
        checkOut: "2024-02-24",
        nights: 2,
      },
    ],
    paymentPlan: [
      {
        id: "payment-1",
        amount: 350000,
        dueDate: "2025-01-15",
        description: "Initial Payment",
      },
      {
        id: "payment-2",
        amount: 400000,
        dueDate: "2025-02-15",
        description: "Post Visa Approval",
      },
      {
        id: "payment-3",
        amount: 150000,
        dueDate: "2025-03-15",
        description: "20 Days Before Departure",
      },
    ],
    inclusions: [
      "Flight: All Flights Mentioned",
      "Tourist Tax: Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns), Novotel (Gold Coast), Holiday Inn (Melbourne)",
      "Hotel: Airport To Hotel - Hotel To Attractions - Day Trips If Any",
    ],
    exclusions: [
      "Airlines Standard Policy: In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.",
      "Flight/Hotel Cancellation: In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.",
      "Trip Insurance: In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.",
    ],
    flights: [
      {
        id: "flight-1",
        date: "Thu 10 Jan'24",
        airline: "Air India",
        flightNumber: "AX-123",
        from: "Delhi (DEL)",
        to: "Singapore (SIN)",
      },
      {
        id: "flight-2",
        date: "Thu 10 Jan'24",
        airline: "Air India",
        flightNumber: "AX-123",
        from: "Delhi (DEL)",
        to: "Singapore (SIN)",
      },
      {
        id: "flight-3",
        date: "Thu 10 Jan'24",
        airline: "Air India",
        flightNumber: "AX-123",
        from: "Delhi (DEL)",
        to: "Singapore (SIN)",
      },
      {
        id: "flight-4",
        date: "Thu 10 Jan'24",
        airline: "Air India",
        flightNumber: "AX-123",
        from: "Delhi (DEL)",
        to: "Singapore (SIN)",
      },
    ],
    activities: [
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Nature/Sightseeing', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
      { city: 'Rio De Janeiro', activity: 'Sydney Harbour Cruise & Taronga Zoo', type: 'Airlines Standard', timeRequired: '2-3 Hours' },
    ],
    scopeOfService: [
      { service: 'Flight Tickets And Hotel Vouchers', details: 'Delivered 3 Days Post Full Payment' },
      { service: 'Web Check-In', details: 'Boarding Pass Delivery Via Email/WhatsApp' },
      { service: 'Support', details: 'Chat Support – Response Time: 4 Hours' },
      { service: 'Cancellation Support', details: 'Provided' },
      { service: 'Trip Support', details: 'Response Time: 5 Minutes' },
    ],
    inclusionItems: [
      { category: 'Flight', count: '2', details: 'All Flights Mentioned', status: 'Awaiting Confirmation' },
      { category: 'Tourist Tax', count: '2', details: 'Yotel (Singapore), Oakwood (Sydney), Mercure (Cairns), Novotel (Gold Coast), Holiday Inn (Melbourne)', status: 'Awaiting Confirmation' },
      { category: 'Hotel', count: '2', details: 'Airport To Hotel - Hotel To Attractions - Day Trips If Any', status: 'Included' },
    ],
    importantNotes: [
      { point: 'Airlines Standard Policy', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
      { point: 'Flight/Hotel Cancellation', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
      { point: 'Trip Insurance', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
      { point: 'Hotel Check-In & Check Out', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
      { point: 'Visa Rejection', details: 'In Case Of Visa Rejection, Visa Fees Or Any Other Non Cancellable Component Cannot Be Reimbursed At Any Cost.' },
    ],
    tcsAmount: 'Not Collected',
    visaDetails: {
      visaType: '123456',
      validity: '123456',
      processingDate: '123456',
    },
  });

  const handleGeneratePDF = async () => {
    if (!itinerary.tourOverview.title) {
      toast.error("Please add a trip title before generating PDF");
      return;
    }
    
    toast.loading("Generating your itinerary PDF...");
    try {
      await generatePDF(itinerary);
      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-card/80 border-b shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={vigoviaLogo} alt="Vigovia" className="h-12" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Itinerary Builder</h1>
                <p className="text-sm text-muted-foreground font-medium">Create professional travel itineraries</p>
              </div>
            </div>
            <Button 
              onClick={handleGeneratePDF}
              size="lg"
              className="bg-primary hover:bg-primary/90 shadow-md font-semibold"
            >
              <FileDown className="mr-2 h-5 w-5" />
              Generate PDF
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center py-12 px-4">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl mb-6 shadow-sm">
            <Plane className="h-10 w-10 text-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4 tracking-tight">
            Build Your Perfect Itinerary
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Create detailed travel plans with day-by-day activities, hotel bookings, and payment schedules. 
            Export to beautifully designed PDFs instantly.
          </p>
        </div>

        {/* Tour Overview */}
        <TourOverviewForm
          data={itinerary.tourOverview}
          onChange={(tourOverview) => setItinerary({ ...itinerary, tourOverview })}
        />

        {/* Day Builder */}
        <DayBuilder
          days={itinerary.days}
          onChange={(days) => setItinerary({ ...itinerary, days })}
        />

        {/* Hotel Manager */}
        <HotelManager
          hotels={itinerary.hotels}
          onChange={(hotels) => setItinerary({ ...itinerary, hotels })}
        />

        {/* Payment Plan */}
        <PaymentPlanBuilder
          payments={itinerary.paymentPlan}
          onChange={(paymentPlan) => setItinerary({ ...itinerary, paymentPlan })}
        />

        {/* Inclusions & Exclusions */}
        <InclusionsExclusions
          inclusions={itinerary.inclusions}
          exclusions={itinerary.exclusions}
          onInclusionsChange={(inclusions) => setItinerary({ ...itinerary, inclusions })}
          onExclusionsChange={(exclusions) => setItinerary({ ...itinerary, exclusions })}
        />

        {/* Bottom Action */}
        <div className="flex justify-center py-12">
          <Button 
            onClick={handleGeneratePDF}
            size="lg"
            className="bg-gradient-to-r from-accent to-primary text-white shadow-xl hover:shadow-2xl transition-all px-12 py-6 text-lg font-bold rounded-xl"
          >
            <FileDown className="mr-3 h-6 w-6" />
            Download Itinerary PDF
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-10 mt-20 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-2xl font-bold text-primary mb-2 tracking-wide">PLAN.PACK.GO</p>
          <p className="text-sm text-muted-foreground font-medium">Powered by Vigovia</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
