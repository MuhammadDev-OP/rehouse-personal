'use client';

import React, { useState } from 'react';
import { z } from 'zod';

// Validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, 'Fornavn er påkrevd'),
  lastName: z.string().min(1, 'Etternavn er påkrevd'),
  email: z.string().email('Vennligst oppgi en gyldig e-postadresse'),
  phone: z.string().min(10, 'Vennligst oppgi et gyldig telefonnummer'),
  message: z.string().min(10, 'Melding må være minst 10 tegn lang'),
});

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      contactSchema.parse(formData);

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-[#a69b8a] text-4xl md:text-5xl font-light mb-8 font-ppvalvestencil">
        Registrer din interesse
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Section */}
        <div>
          <label className="block text-black text-lg font-medium mb-4">
            Navn <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Fornavn"
                className="w-full p-3 bg-transparent border-b-2 border-[#d4c4b0] focus:border-[#a69b8a] outline-none text-black placeholder-[#a69b8a] transition-colors"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Etternavn"
                className="w-full p-3 bg-transparent border-b-2 border-[#d4c4b0] focus:border-[#a69b8a] outline-none text-black placeholder-[#a69b8a] transition-colors"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div>
          <label className="block text-black text-lg font-medium mb-4">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 bg-transparent border-b-2 border-[#d4c4b0] focus:border-[#a69b8a] outline-none text-black placeholder-[#a69b8a] transition-colors"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone Section */}
        <div>
          <label className="block text-black text-lg font-medium mb-4">
            Telefon <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="0301 2345678"
              className="flex-1 p-3 bg-transparent border-b-2 border-[#d4c4b0] focus:border-[#a69b8a] outline-none text-black placeholder-[#a69b8a] transition-colors"
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Message Section */}
        <div>
          <label className="block text-black text-lg font-medium mb-4">
            Melding
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={6}
            className="w-full p-3 bg-transparent border-b-2 border-[#d4c4b0] focus:border-[#a69b8a] outline-none text-black placeholder-[#a69b8a] transition-colors resize-none"
            placeholder="Fortell oss om prosjektet ditt..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#a69b8a] hover:bg-[#968b7a] disabled:bg-[#d4c4b0] text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sender...' : 'Send'}
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Takk! Meldingen din har blitt sendt.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Noe gikk galt. Vennligst prøv igjen.
          </div>
        )}
      </form>
    </div>
  );
}