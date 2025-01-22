"use client";
import React from 'react';
import RenderStar from "@/components/renderStar"; // Ensure you have the RenderStar component if needed

const HelpPage = () => {
  return (
    <div className="bg-[#a39e9e] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[1000px]">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-8">Help & Support</h1>

        {/* Frequently Asked Questions (FAQs) */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions (FAQs)</h2>
          <div className="space-y-4">
            {/* FAQ 1 */}
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded">
                <span>1. How do I make a booking?</span>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="p-4 border-l-4 border-blue-500 bg-gray-50">
                You can make a booking by searching for your desired location, selecting your check-in and check-out dates, and choosing a room that fits your needs.
              </div>
            </details>

            {/* FAQ 2 */}
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded">
                <span>2. Can I cancel my booking?</span>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="p-4 border-l-4 border-blue-500 bg-gray-50">
                Yes, you can cancel your booking according to the cancellation policy of each hotel. Please review the details before making a booking.
              </div>
            </details>

            {/* FAQ 3 */}
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer bg-gray-100 p-4 rounded">
                <span>3. What payment methods are accepted?</span>
                <span className="transition-transform duration-300 group-open:rotate-180">
                  ▼
                </span>
              </summary>
              <div className="p-4 border-l-4 border-blue-500 bg-gray-50">
                We accept various payment methods including credit cards, debit cards, PayPal, and other popular digital wallets.
              </div>
            </details>
          </div>
        </section>

        {/* Usage Guides */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Usage Guides</h2>
          <div className="space-y-4">
            {/* Guide 1 */}
            <div>
              <h3 className="text-xl font-medium mb-2">Searching and Filtering Results</h3>
              <p>
                Use the search bar to enter your destination, check-in, and check-out dates. You can also apply filters such as price range, room type, and amenities to narrow down your search results.
              </p>
            </div>

            {/* Guide 2 */}
            <div>
              <h3 className="text-xl font-medium mb-2">Managing Your Bookings</h3>
              <p>
                Access the "My Bookings" section in your account to view, modify, or cancel your reservations. Ensure you check the cancellation policies of each hotel before making any changes.
              </p>
            </div>

            {/* Guide 3 */}
            <div>
              <h3 className="text-xl font-medium mb-2">Writing Reviews</h3>
              <p>
                After your stay, you can write a review about your experience. Your feedback helps other travelers make informed decisions and assists us in improving our services.
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <p>
            We are committed to protecting your personal information. Below are the key points of our privacy policy:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Information Collection:</strong> We only collect information necessary to provide you with the best possible service.
            </li>
            <li>
              <strong>Use of Information:</strong> Your information is used to process bookings, provide customer support, and improve our services.
            </li>
            <li>
              <strong>Information Protection:</strong> We employ advanced security measures to protect your personal information from unauthorized access.
            </li>
            <li>
              <strong>Information Sharing:</strong> We do not share your personal information with third parties without your consent, unless necessary to provide the service.
            </li>
          </ul>
        </section>

        {/* Legal Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Legal Information</h2>
          <p>
            Below are important legal details related to the use of our services:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Terms of Service:</strong> By using our services, you agree to abide by the terms and conditions outlined in this document.
            </li>
            <li>
              <strong>Consumer Protection:</strong> We adhere to legal regulations protecting consumer rights, ensuring you receive full benefits when using our services.
            </li>
            <li>
              <strong>Dispute Resolution:</strong> In case of any disputes between you and us or between you and service providers, we strive to resolve them amicably and reasonably. If necessary, disputes will be settled according to applicable laws.
            </li>
          </ul>
        </section>

        {/* Additional Features Guides */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Guides for Additional Features</h2>
          <div className="space-y-4">
            {/* Feature 1 */}
            <div>
              <h3 className="text-xl font-medium mb-2">Booking Transportation and Tours</h3>
              <p>
                You can book transportation from the airport or within the city, as well as exciting tours through our website. Choose services that fit your schedule and preferences.
              </p>
            </div>

            {/* Feature 2 */}
            <div>
              <h3 className="text-xl font-medium mb-2">Special Policies for VIP Customers</h3>
              <p>
                Our VIP customers receive exclusive benefits such as discounts, complimentary room upgrades, and dedicated support services. Register for our VIP program to enjoy these perks.
              </p>
            </div>

            {/* Feature 3 */}
            <div>
              <h3 className="text-xl font-medium mb-2">Travel Insurance</h3>
              <p>
                We offer travel insurance packages to protect you from unforeseen risks during your trip. Select the appropriate insurance plan for a worry-free travel experience.
              </p>
            </div>
          </div>
        </section>

        {/* Reviews and Feedback */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Reviews and Feedback</h2>
          <p>
            We highly value your feedback to improve our services. Here are ways you can share your opinions:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              <strong>Write a Review:</strong> After your stay, take a moment to write a review about your experience. This not only helps other travelers but also assists us in enhancing our services.
            </li>
            <li>
              <strong>Direct Feedback:</strong> If you encounter any issues while using our services, contact our support team for prompt assistance.
            </li>
            <li>
              <strong>Suggestions for Improvement:</strong> We are always open to your suggestions to better our services. Don’t hesitate to share your ideas.
            </li>
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Booking.com. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="/terms" className="hover:underline">Terms of Service</a>
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/contact" className="hover:underline">Contact Us</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HelpPage;
