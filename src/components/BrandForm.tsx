import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { FormField } from './FormField';
import { cn } from '../lib/utils';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function BrandForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    industry: '',
    budget: '',
    objective: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (name: string, value: string) => {
    let error = '';
    const trimmedValue = value.trim();
    
    if (!trimmedValue) {
      error = `${name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`;
      return error;
    }

    switch (name) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
          error = 'Please enter a valid work email address';
        }
        break;
      case 'companyName':
        if (trimmedValue.length < 2) error = 'Company name must be at least 2 characters';
        if (trimmedValue.length > 50) error = 'Company name is too long (max 50)';
        break;
      case 'contactName':
        if (trimmedValue.length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'objective':
        if (trimmedValue.length < 20) error = `Please provide more detail (at least ${20 - trimmedValue.length} more characters)`;
        if (trimmedValue.length > 1000) error = 'Objective is too long (max 1000)';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<any>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validate(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }

    setStatus('submitting');
    try {
      await addDoc(collection(db, 'brandApplications'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        industry: '',
        budget: '',
        objective: '',
      });
      setErrors({});
      setTouched({});
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  const isValid = (name: string) => touched[name] && !errors[name] && formData[name as keyof typeof formData].trim() !== '';

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center p-12 text-center space-y-6 bg-white/5 rounded-[2rem] border border-white/10 shadow-inner"
      >
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-black shadow-2xl animate-float">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-medium text-white tracking-tight">Transmission Received.</h3>
          <p className="text-gray-500 text-sm font-light italic max-w-xs">
            Your organization has been entered into our review queue. Expect a formal response within 48 hours.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button 
            onClick={() => setStatus('idle')}
            className="w-full py-4 bg-white text-black font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-gray-200 transition-all shadow-lg active:scale-[0.98]"
          >
            New Application
          </button>
          <a 
            href="mailto:inflow.collabs@gmail.com?subject=Brand Inquiry: Organization Onboarding"
            className="w-full py-4 border border-white/10 text-white font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            Direct Support →
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <FormField id="companyName" label="Company Name" error={errors.companyName} isValid={isValid('companyName')} required>
        <input 
          name="companyName"
          placeholder="e.g. Zara India"
          value={formData.companyName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormField>

      <FormField id="contactName" label="Your Name" error={errors.contactName} isValid={isValid('contactName')} required>
        <input 
          name="contactName"
          placeholder="First & Last Name"
          value={formData.contactName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormField>

      <FormField id="email" label="Work Email" error={errors.email} isValid={isValid('email')} required>
        <input 
          name="email"
          type="email"
          placeholder="work@company.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormField>

      <FormField id="industry" label="Industry / Niche" error={errors.industry} isValid={isValid('industry')} required>
        <select 
          name="industry"
          value={formData.industry}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" disabled>Select your industry</option>
          <option value="fashion">Fashion & Lifestyle</option>
          <option value="food">Food & Beverage</option>
          <option value="tech">Tech & Gadgets</option>
          <option value="fitness">Fitness & Wellness</option>
          <option value="beauty">Beauty & Skincare</option>
          <option value="finance">Finance & Business</option>
          <option value="travel">Travel & Hospitality</option>
          <option value="gaming">Gaming & Entertainment</option>
          <option value="other">Other</option>
        </select>
      </FormField>

      <FormField id="budget" label="Estimated Budget (INR)" error={errors.budget} isValid={isValid('budget')} required>
        <select 
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" disabled>Select a range</option>
          <option value="under25">Under ₹25,000</option>
          <option value="25-75">₹25,000 – ₹75,000</option>
          <option value="75-200">₹75,000 – ₹2,00,000</option>
          <option value="200-500">₹2,00,000 – ₹5,00,000</option>
          <option value="500plus">₹5,00,000+</option>
        </select>
      </FormField>

      <FormField 
        id="objective" 
        label="Your Objective" 
        error={errors.objective} 
        isValid={isValid('objective')} 
        required
      >
        <div className="relative">
          <textarea 
            name="objective"
            placeholder="What do you want to achieve? (e.g. 20% sales lift for new collection)"
            value={formData.objective}
            onChange={handleChange}
            onBlur={handleBlur}
            className="min-h-[120px] resize-none"
          />
          <div className={cn(
            "absolute bottom-3 right-3 text-[9px] font-mono font-bold",
            formData.objective.length < 20 ? "text-gray-700" : formData.objective.length > 900 ? "text-red-400" : "text-gray-500"
          )}>
            {formData.objective.length} / 1000
          </div>
        </div>
      </FormField>

      <AnimatePresence>
        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>Something went wrong. Please try again later.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        type="submit" 
        disabled={status === 'submitting'}
        className="w-full bg-black text-white font-bold py-5 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800 disabled:opacity-50 transition-all active:scale-[0.98] shadow-2xl text-[10px] uppercase tracking-[0.2em]"
      >
        {status === 'submitting' ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          "Submit Brand Application →"
        )}
      </button>
      
      <p className="text-[0.7rem] text-gray-500 text-center leading-relaxed">
        🔒 Your info is only seen by the Inflow team.<br/>We'll reach out within 48 hours.
      </p>
    </form>
  );
}
