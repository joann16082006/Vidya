/**
 * emailService.js
 * Handles sending admission notifications and student confirmations.
 * Uses EmailJS for real email delivery.
 */

import emailjs from '@emailjs/browser';
import { dbService } from './dbService';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const emailService = {
  /**
   * Sends emails to the admission office using EmailJS.
   * @param {Object} appData - The full application details
   */
  sendAdmissionEmails: async (appData) => {
    try {
      // Data mapping from app code to EmailJS template variables
      const templateParams = {
        name: appData.name,
        phone: appData.phone,
        email: appData.email,
        gender: appData.gender,
        dob: appData.dob,
        school: appData.school,
        marks10: appData.marks10,
        marks12: appData.marks12,
        board: appData.board,
        address: appData.address,
        course: appData.course,
        appId: appData.appId,
        submission_date: new Date().toLocaleString()
      };

      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      console.log('EmailJS Response:', response.status, response.text);
      return { success: true };
    } catch (error) {
      console.error('EmailJS sending failed:', error);

      // Log failure in the "admin panel" (localStorage log)
      dbService.logError({
        type: 'EMAIL_FAILURE',
        error: error.text || error.message || 'Unknown EmailJS error',
        appId: appData.appId,
        studentEmail: appData.email
      });

      throw new Error('Email delivery failed. Please check your EmailJS configuration.');
    }
  }
};
