import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ItineraryData } from '@/types/itinerary';
import vigoviaLogo from '@/assets/vigovia-logo-full.png';

export const generatePDF = async (data: ItineraryData) => {
  const container = document.createElement('div');
  container.style.width = '210mm';
  container.style.backgroundColor = 'white';
  container.style.fontFamily = "'Bricolage Grotesque', sans-serif";
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.color = '#000';
  
  const pages: string[] = [];
  
  // Page 1 - Header & First 3 Days
  pages.push(`
    <div style="width: 210mm; min-height: 297mm; padding: 20mm 15mm 15mm 15mm; box-sizing: border-box; position: relative; background: white;">
      <!-- Logo -->
      <div style="text-align: center; margin-bottom: 20mm;">
        <img src="${vigoviaLogo}" style="height: 60px; width: auto;" />
      </div>

      <!-- Gradient Header Card -->
      <div style="background: linear-gradient(135deg, #5BA3E7 0%, #9B7FD9 100%); border-radius: 20px; padding: 30px; text-align: center; color: white; margin-bottom: 15mm;">
        <div style="font-size: 32px; font-weight: 600; margin-bottom: 10px;">Hi, ${data.tourOverview.customerName || 'Traveler'}!</div>
        <div style="font-size: 36px; font-weight: 700; margin-bottom: 8px;">${data.tourOverview.title}</div>
        <div style="font-size: 24px; font-weight: 500; margin-bottom: 15px;">${data.tourOverview.duration}</div>
        <div style="font-size: 20px; display: flex; justify-content: center; gap: 15px;">
          <span>✈️</span><span>🏨</span><span>🎡</span><span>🚗</span><span>📍</span>
        </div>
      </div>

      <!-- Info Table -->
      <div style="border: 2px solid #E5E7EB; border-radius: 15px; padding: 20px; margin-bottom: 15mm; display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; font-size: 13px;">
        <div><div style="font-weight: 600; margin-bottom: 5px; font-size: 12px;">Departure From :</div><div style="font-size: 13px;">${data.tourOverview.departureFrom || 'N/A'}</div></div>
        <div><div style="font-weight: 600; margin-bottom: 5px; font-size: 12px;">Departure :</div><div style="font-size: 13px;">${new Date(data.tourOverview.departureDate).toLocaleDateString('en-GB')}</div></div>
        <div><div style="font-weight: 600; margin-bottom: 5px; font-size: 12px;">Arrival :</div><div style="font-size: 13px;">${new Date(data.tourOverview.returnDate).toLocaleDateString('en-GB')}</div></div>
        <div><div style="font-weight: 600; margin-bottom: 5px; font-size: 12px;">Destination :</div><div style="font-size: 13px;">${data.tourOverview.destination || 'N/A'}</div></div>
        <div><div style="font-weight: 600; margin-bottom: 5px; font-size: 12px;">No. Of Travellers :</div><div style="font-size: 13px;">${data.tourOverview.travelers}</div></div>
      </div>

      <!-- Days -->
      ${data.days.slice(0, 3).map((day, idx) => `
        <div style="display: flex; gap: 20px; margin-bottom: ${idx < 2 ? '20mm' : '15mm'}; padding-bottom: ${idx < 2 ? '15mm' : '10mm'}; ${idx < 2 ? 'border-bottom: 1.5px solid #E5E7EB;' : ''}">
          <!-- Day Number Pill -->
          <div style="background: #2C1F4A; color: white; border-radius: 50px; width: 60px; min-height: 150px; display: flex; align-items: center; justify-content: center; writing-mode: vertical-rl; text-orientation: mixed; font-weight: 700; font-size: 20px; flex-shrink: 0; letter-spacing: 2px;">Day ${day.dayNumber}</div>
          
          <!-- Image and Title Section -->
          <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0;">
            <div style="width: 110px; height: 110px; border-radius: 50%; background: #E5E7EB; overflow: hidden; margin-bottom: 10px;">
              ${day.imageUrl ? `<img src="${day.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
            </div>
            <div style="text-align: center; max-width: 140px;">
              <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">${day.date || '27th November'}</div>
              <div style="font-weight: 600; font-size: 13px; color: #4B5563; line-height: 1.3;">${day.title}</div>
            </div>
          </div>

          <!-- Timeline -->
          <div style="flex: 1; position: relative; padding-left: 30px; padding-top: 10px;">
            <div style="position: absolute; left: 8px; top: 20px; bottom: 20px; width: 3px; background: #5BA3E7;"></div>
            ${day.activities.filter(a => a.description).map((activity, i) => `
              <div style="position: relative; margin-bottom: ${i < day.activities.filter(a => a.description).length - 1 ? '20px' : '0'};">
                <div style="position: absolute; left: -23px; top: 3px; width: 12px; height: 12px; border: 3px solid #5BA3E7; background: white; border-radius: 50%;"></div>
                <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; text-transform: capitalize;">${activity.time}</div>
                <div style="font-size: 12px; line-height: 1.6; color: #4B5563;">
                  ${activity.description.split('\n').map(line => `• ${line.trim()}`).join('<br>')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}

      <!-- Footer -->
      <div style="position: absolute; bottom: 10mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; color: #4B5563;">
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #000; margin-bottom: 2px;">Vigovia Tech Pvt. Ltd</div>
          <div>Registered Office: Hd-109 Cinnabar Hills,</div>
          <div>Links Business Park, Karnataka, India.</div>
        </div>
        <div style="flex: 1; text-align: center;">
          <div><span style="font-weight: 600;">Phone:</span> +91-9504061112</div>
          <div><span style="font-weight: 600;">Email ID:</span> Utkarsh@Vigovia.Com</div>
          <div><span style="font-weight: 600;">CIN:</span> U79110KA2024PTC191890</div>
        </div>
        <div style="flex: 1; text-align: right;">
          <img src="${vigoviaLogo}" style="height: 35px; width: auto; margin-left: auto; display: block;" />
        </div>
      </div>
    </div>
  `);

  // Page 2 - Remaining Days, Flights, Hotels
  if (data.days.length > 3 || data.flights?.length > 0 || data.hotels.length > 0) {
    const remainingDays = data.days.slice(3);
    pages.push(`
      <div style="width: 210mm; min-height: 297mm; padding: 20mm 15mm 15mm 15mm; box-sizing: border-box; position: relative; background: white;">
        ${remainingDays.map((day, idx) => `
          <div style="display: flex; gap: 20px; margin-bottom: 20mm; padding-bottom: 15mm; border-bottom: 1.5px solid #E5E7EB;">
            <div style="background: #2C1F4A; color: white; border-radius: 50px; width: 60px; min-height: 150px; display: flex; align-items: center; justify-content: center; writing-mode: vertical-rl; text-orientation: mixed; font-weight: 700; font-size: 20px; flex-shrink: 0; letter-spacing: 2px;">Day ${day.dayNumber}</div>
            
            <div style="display: flex; flex-direction: column; align-items: center; flex-shrink: 0;">
              <div style="width: 110px; height: 110px; border-radius: 50%; background: #E5E7EB; overflow: hidden; margin-bottom: 10px;">
                ${day.imageUrl ? `<img src="${day.imageUrl}" style="width: 100%; height: 100%; object-fit: cover;">` : ''}
              </div>
              <div style="text-align: center; max-width: 140px;">
                <div style="font-weight: 700; font-size: 16px; margin-bottom: 8px;">${day.date || '27th November'}</div>
                <div style="font-weight: 600; font-size: 13px; color: #4B5563; line-height: 1.3;">${day.title}</div>
              </div>
            </div>

            <div style="flex: 1; position: relative; padding-left: 30px; padding-top: 10px;">
              <div style="position: absolute; left: 8px; top: 20px; bottom: 20px; width: 3px; background: #5BA3E7;"></div>
              ${day.activities.filter(a => a.description).map((activity, i) => `
                <div style="position: relative; margin-bottom: ${i < day.activities.filter(a => a.description).length - 1 ? '20px' : '0'};">
                  <div style="position: absolute; left: -23px; top: 3px; width: 12px; height: 12px; border: 3px solid #5BA3E7; background: white; border-radius: 50%;"></div>
                  <div style="font-weight: 700; font-size: 14px; margin-bottom: 6px; text-transform: capitalize;">${activity.time}</div>
                  <div style="font-size: 12px; line-height: 1.6; color: #4B5563;">
                    ${activity.description.split('\n').map(line => `• ${line.trim()}`).join('<br>')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        ${data.flights && data.flights.length > 0 ? `
          <div style="margin-bottom: 20mm;">
            <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 15px; color: #000;">Flight <span style="color: #9B7FD9;">Summary</span></h2>
            ${data.flights.map(flight => `
              <div style="display: flex; align-items: stretch; margin-bottom: 10px; overflow: hidden; border-radius: 8px;">
                <div style="background: #F3E8FF; padding: 12px 25px; font-weight: 600; font-size: 14px; min-width: 140px; position: relative; clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%);">
                  ${flight.date}
                </div>
                <div style="background: #F9FAFB; padding: 12px 25px; flex: 1; font-size: 13px; margin-left: -5px;">
                  <span style="font-weight: 700;">Fly ${flight.airline} (${flight.flightNumber})</span> From ${flight.from} To ${flight.to}.
                </div>
              </div>
            `).join('')}
            <div style="font-size: 10px; color: #6B7280; margin-top: 10px; line-height: 1.5;">
              Note: All Flights Include Meals, Seat Choice (Excluding XL), And 20kg/25Kg Checked Baggage.
            </div>
          </div>
        ` : ''}

        ${data.hotels.length > 0 ? `
          <div style="margin-bottom: 20mm;">
            <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 15px; color: #000;">Hotel <span style="color: #9B7FD9;">Bookings</span></h2>
            <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
              <thead>
                <tr>
                  <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: left; font-size: 14px; font-weight: 600; border-radius: 12px 0 0 0;">City</th>
                  <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: left; font-size: 14px; font-weight: 600;">Check In</th>
                  <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: left; font-size: 14px; font-weight: 600;">Check Out</th>
                  <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: center; font-size: 14px; font-weight: 600;">Nights</th>
                  <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: left; font-size: 14px; font-weight: 600; border-radius: 0 12px 0 0;">Hotel Name</th>
                </tr>
              </thead>
              <tbody>
                ${data.hotels.map((hotel, idx) => `
                  <tr style="background: ${idx % 2 === 0 ? '#F3E8FF' : '#FEFBFF'};">
                    <td style="padding: 12px 15px; font-size: 12px;">${hotel.city}</td>
                    <td style="padding: 12px 15px; font-size: 12px;">${new Date(hotel.checkIn).toLocaleDateString('en-GB')}</td>
                    <td style="padding: 12px 15px; font-size: 12px;">${new Date(hotel.checkOut).toLocaleDateString('en-GB')}</td>
                    <td style="padding: 12px 15px; text-align: center; font-size: 12px;">${hotel.nights}</td>
                    <td style="padding: 12px 15px; font-size: 12px; font-weight: 600;">${hotel.name}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div style="font-size: 10px; color: #4B5563; margin-top: 12px; line-height: 1.6;">
              1. All Hotels Are Tentative And Can Be Replaced With Similar.<br>
              2. Breakfast Included For All Hotel Stays.<br>
              3. All Hotels Will Be 4* And Above Category<br>
              4. A maximum occupancy of 2 people/room is allowed in most hotels.
            </div>
          </div>
        ` : ''}

        <div style="position: absolute; bottom: 10mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; color: #4B5563;">
          <div style="flex: 1;">
            <div style="font-weight: 600; color: #000; margin-bottom: 2px;">Vigovia Tech Pvt. Ltd</div>
            <div>Registered Office: Hd-109 Cinnabar Hills,</div>
            <div>Links Business Park, Karnataka, India.</div>
          </div>
          <div style="flex: 1; text-align: center;">
            <div><span style="font-weight: 600;">Phone:</span> +91-9504061112</div>
            <div><span style="font-weight: 600;">Email ID:</span> Utkarsh@Vigovia.Com</div>
            <div><span style="font-weight: 600;">CIN:</span> U79110KA2024PTC191890</div>
          </div>
          <div style="flex: 1; text-align: right;">
            <img src="${vigoviaLogo}" style="height: 35px; width: auto; margin-left: auto; display: block;" />
          </div>
        </div>
      </div>
    `);
  }

  // Page 3 - Important Notes, Scope of Service, Inclusion Summary
  pages.push(`
    <div style="width: 210mm; min-height: 297mm; padding: 20mm 15mm 15mm 15mm; box-sizing: border-box; position: relative; background: white;">
      ${data.importantNotes.length > 0 ? `
        <div style="margin-bottom: 25mm;">
          <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 15px; color: #000;">Important <span style="color: #9B7FD9;">Notes</span></h2>
          <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
            <thead>
              <tr>
                <th style="background: #2C1F4A; color: white; padding: 12px 20px; text-align: left; font-size: 14px; font-weight: 600; border-radius: 12px 0 0 0; width: 35%;">Point</th>
                <th style="background: #2C1F4A; color: white; padding: 12px 20px; text-align: left; font-size: 14px; font-weight: 600; border-radius: 0 12px 0 0;">Details</th>
              </tr>
            </thead>
            <tbody>
              ${data.importantNotes.map((note, idx) => `
                <tr style="background: ${idx % 2 === 0 ? '#F3E8FF' : '#FEFBFF'};">
                  <td style="padding: 12px 20px; font-size: 12px;">${note.point}</td>
                  <td style="padding: 12px 20px; font-size: 12px;">${note.details}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      ${data.scopeOfService.length > 0 ? `
        <div style="margin-bottom: 25mm;">
          <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 15px; color: #000;">Scope Of <span style="color: #9B7FD9;">Service</span></h2>
          <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
            <thead>
              <tr>
                <th style="background: #2C1F4A; color: white; padding: 12px 20px; text-align: left; font-size: 14px; font-weight: 600; border-radius: 12px 0 0 0; width: 35%;">Service</th>
                <th style="background: #2C1F4A; color: white; padding: 12px 20px; text-align: left; font-size: 14px; font-weight: 600; border-radius: 0 12px 0 0;">Details</th>
              </tr>
            </thead>
            <tbody>
              ${data.scopeOfService.map((service, idx) => `
                <tr style="background: ${idx % 2 === 0 ? '#F3E8FF' : '#FEFBFF'};">
                  <td style="padding: 12px 20px; font-size: 12px;">${service.service}</td>
                  <td style="padding: 12px 20px; font-size: 12px;">${service.details}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      ${data.inclusionItems.length > 0 ? `
        <div style="margin-bottom: 20mm;">
          <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 15px; color: #000;">Inclusion <span style="color: #9B7FD9;">Summary</span></h2>
          <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
            <thead>
              <tr>
                <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: left; font-size: 14px; font-weight: 600; border-radius: 12px 0 0 0; width: 15%;">Category</th>
                <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: center; font-size: 14px; font-weight: 600; width: 10%;">Count</th>
                <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: left; font-size: 14px; font-weight: 600;">Details</th>
                <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: left; font-size: 14px; font-weight: 600; border-radius: 0 12px 0 0; width: 20%;">Status / Comments</th>
              </tr>
            </thead>
            <tbody>
              ${data.inclusionItems.map((item, idx) => `
                <tr style="background: ${idx % 2 === 0 ? '#F3E8FF' : '#FEFBFF'};">
                  <td style="padding: 12px 15px; font-size: 12px;">${item.category}</td>
                  <td style="padding: 12px 15px; text-align: center; font-size: 12px;">${item.count}</td>
                  <td style="padding: 12px 15px; font-size: 12px;">${item.details}</td>
                  <td style="padding: 12px 15px; font-size: 12px;">${item.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div style="font-size: 10px; color: #4B5563; margin-top: 12px; line-height: 1.6; font-weight: 600;">
            Transfer Policy(Refundable Upon Claim)
          </div>
          <div style="font-size: 10px; color: #4B5563; line-height: 1.6;">
            If Any Transfer Is Delayed Beyond 15 Minutes, Customers May Book An App-Based Or Radio Taxi And Claim A Refund For That Specific Leg.
          </div>
        </div>
      ` : ''}

      <div style="position: absolute; bottom: 10mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; color: #4B5563;">
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #000; margin-bottom: 2px;">Vigovia Tech Pvt. Ltd</div>
          <div>Registered Office: Hd-109 Cinnabar Hills,</div>
          <div>Links Business Park, Karnataka, India.</div>
        </div>
        <div style="flex: 1; text-align: center;">
          <div><span style="font-weight: 600;">Phone:</span> +91-9504061112</div>
          <div><span style="font-weight: 600;">Email ID:</span> Utkarsh@Vigovia.Com</div>
          <div><span style="font-weight: 600;">CIN:</span> U79110KA2024PTC191890</div>
        </div>
        <div style="flex: 1; text-align: right;">
          <img src="${vigoviaLogo}" style="height: 35px; width: auto; margin-left: auto; display: block;" />
        </div>
      </div>
    </div>
  `);

  // Page 4 - Activity Table, Terms and Conditions
  pages.push(`
    <div style="width: 210mm; min-height: 297mm; padding: 20mm 15mm 15mm 15mm; box-sizing: border-box; position: relative; background: white;">
      ${data.activities.length > 0 ? `
        <div style="margin-bottom: 25mm;">
          <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 15px; color: #000;">Activity <span style="color: #9B7FD9;">Table</span></h2>
          <table style="width: 100%; border-collapse: separate; border-spacing: 0;">
            <thead>
              <tr>
                <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: left; font-size: 14px; font-weight: 600; border-radius: 12px 0 0 0; width: 18%;">City</th>
                <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: left; font-size: 14px; font-weight: 600; width: 42%;">Activity</th>
                <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: left; font-size: 14px; font-weight: 600; width: 22%;">Type</th>
                <th style="background: #2C1F4A; color: white; padding: 12px 15px; text-align: left; font-size: 14px; font-weight: 600; border-radius: 0 12px 0 0;">Time Required</th>
              </tr>
            </thead>
            <tbody>
              ${data.activities.map((activity, idx) => `
                <tr style="background: ${idx % 2 === 0 ? '#F3E8FF' : '#FEFBFF'};">
                  <td style="padding: 12px 15px; font-size: 12px;">${activity.city}</td>
                  <td style="padding: 12px 15px; font-size: 12px;">${activity.activity}</td>
                  <td style="padding: 12px 15px; font-size: 12px;">${activity.type}</td>
                  <td style="padding: 12px 15px; font-size: 12px;">${activity.timeRequired}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}

      <div style="margin-bottom: 20mm;">
        <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 15px; color: #000;">Terms and <span style="color: #9B7FD9;">Conditions</span></h2>
        <a href="#" style="color: #5BA3E7; font-size: 14px; text-decoration: none; font-weight: 600;">View all terms and conditions</a>
      </div>

      <div style="position: absolute; bottom: 10mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; color: #4B5563;">
        <div style="flex: 1;">
          <div style="font-weight: 600; color: #000; margin-bottom: 2px;">Vigovia Tech Pvt. Ltd</div>
          <div>Registered Office: Hd-109 Cinnabar Hills,</div>
          <div>Links Business Park, Karnataka, India.</div>
        </div>
        <div style="flex: 1; text-align: center;">
          <div><span style="font-weight: 600;">Phone:</span> +91-9504061112</div>
          <div><span style="font-weight: 600;">Email ID:</span> Utkarsh@Vigovia.Com</div>
          <div><span style="font-weight: 600;">CIN:</span> U79110KA2024PTC191890</div>
        </div>
        <div style="flex: 1; text-align: right;">
          <img src="${vigoviaLogo}" style="height: 35px; width: auto; margin-left: auto; display: block;" />
        </div>
      </div>
    </div>
  `);

  // Page 5 - Payment Plan & Visa Details
  if (data.paymentPlan.length > 0) {
    const totalAmount = data.paymentPlan.reduce((sum, p) => sum + p.amount, 0);
    pages.push(`
      <div style="width: 210mm; min-height: 297mm; padding: 20mm 15mm 15mm 15mm; box-sizing: border-box; position: relative; background: white;">
        <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 15px; color: #000;">Payment <span style="color: #9B7FD9;">Plan</span></h2>
        
        <div style="display: flex; align-items: stretch; margin-bottom: 10px; overflow: hidden; border-radius: 8px;">
          <div style="background: #F3E8FF; padding: 14px 28px; font-weight: 700; font-size: 15px; min-width: 160px; position: relative; clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%);">
            Total Amount
          </div>
          <div style="background: #F9FAFB; padding: 14px 28px; flex: 1; font-size: 14px; font-weight: 600; margin-left: -5px; border: 1.5px solid #E5E7EB; border-left: none;">
            ₹ ${totalAmount.toLocaleString('en-IN')} For ${data.tourOverview.travelers} Pax (Inclusive Of GST)
          </div>
        </div>

        <div style="display: flex; align-items: stretch; margin-bottom: 20px; overflow: hidden; border-radius: 8px;">
          <div style="background: #F3E8FF; padding: 14px 28px; font-weight: 700; font-size: 15px; min-width: 160px; position: relative; clip-path: polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%);">
            TCS
          </div>
          <div style="background: #F9FAFB; padding: 14px 28px; flex: 1; font-size: 14px; font-weight: 600; margin-left: -5px; border: 1.5px solid #E5E7EB; border-left: none;">
            ${data.tcsAmount || 'Not Collected'}
          </div>
        </div>

        <table style="width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 30mm;">
          <thead>
            <tr>
              <th style="background: #2C1F4A; color: white; padding: 14px 20px; text-align: left; border-radius: 12px 0 0 0; font-size: 14px; font-weight: 600;">Installment</th>
              <th style="background: #2C1F4A; color: white; padding: 14px 20px; text-align: left; font-size: 14px; font-weight: 600;">Amount</th>
              <th style="background: #2C1F4A; color: white; padding: 14px 20px; text-align: left; border-radius: 0 12px 0 0; font-size: 14px; font-weight: 600;">Due Date</th>
            </tr>
          </thead>
          <tbody>
            ${data.paymentPlan.map((payment, idx) => `
              <tr style="background: ${idx % 2 === 0 ? '#F3E8FF' : '#FEFBFF'};">
                <td style="padding: 14px 20px; font-size: 13px;">Installment ${idx + 1}</td>
                <td style="padding: 14px 20px; font-size: 13px; font-weight: 600;">₹${payment.amount.toLocaleString('en-IN')}</td>
                <td style="padding: 14px 20px; font-size: 13px;">${payment.description || new Date(payment.dueDate).toLocaleDateString('en-GB')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        ${data.visaDetails ? `
          <div style="margin-bottom: 30mm;">
            <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 15px; color: #000;">Visa <span style="color: #9B7FD9;">Details</span></h2>
            <div style="border: 1.5px solid #E5E7EB; border-radius: 12px; padding: 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; font-size: 13px;">
              <div>
                <div style="font-weight: 600; margin-bottom: 5px;">Visa Type :</div>
                <div>${data.visaDetails.visaType}</div>
              </div>
              <div>
                <div style="font-weight: 600; margin-bottom: 5px;">Validity:</div>
                <div>${data.visaDetails.validity}</div>
              </div>
              <div>
                <div style="font-weight: 600; margin-bottom: 5px;">Processing Date :</div>
                <div>${data.visaDetails.processingDate}</div>
              </div>
            </div>
          </div>
        ` : ''}

        <div style="text-align: center; margin-top: 40mm;">
          <div style="font-size: 40px; font-weight: 700; letter-spacing: 3px; margin-bottom: 20px; color: #2C1F4A;">PLAN.PACK.GO!</div>
          <div style="display: inline-block; background: #8B3DFF; color: white; padding: 16px 60px; border-radius: 50px; font-size: 18px; font-weight: 600;">Book Now</div>
        </div>

        <div style="position: absolute; bottom: 10mm; left: 15mm; right: 15mm; display: flex; justify-content: space-between; align-items: flex-end; font-size: 10px; color: #4B5563;">
          <div style="flex: 1;">
            <div style="font-weight: 600; color: #000; margin-bottom: 2px;">Vigovia Tech Pvt. Ltd</div>
            <div>Registered Office: Hd-109 Cinnabar Hills,</div>
            <div>Links Business Park, Karnataka, India.</div>
          </div>
          <div style="flex: 1; text-align: center;">
            <div><span style="font-weight: 600;">Phone:</span> +91-9504061112</div>
            <div><span style="font-weight: 600;">Email ID:</span> Utkarsh@Vigovia.Com</div>
            <div><span style="font-weight: 600;">CIN:</span> U79110KA2024PTC191890</div>
          </div>
          <div style="flex: 1; text-align: right;">
            <img src="${vigoviaLogo}" style="height: 35px; width: auto; margin-left: auto; display: block;" />
          </div>
        </div>
      </div>
    `);
  }

  container.innerHTML = pages.join('');
  document.body.appendChild(container);
  
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageElements = container.children;
    for (let i = 0; i < pageElements.length; i++) {
      const pageElement = pageElements[i] as HTMLElement;
      
      const canvas = await html2canvas(pageElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: true,
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      if (i > 0) pdf.addPage();
      
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    }
    
    const fileName = `${data.tourOverview.title.replace(/\s+/g, '_')}_Itinerary.pdf`;
    pdf.save(fileName);
  } finally {
    document.body.removeChild(container);
  }
};
