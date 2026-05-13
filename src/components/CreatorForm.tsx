import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { FormField } from './FormField';
import { cn } from '../lib/utils';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function CreatorForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    platform: '',
    niche: '',
    followerCount: '',
    bio: '',
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
          error = 'Please enter a valid email address';
        }
        break;
      case 'fullName':
        if (trimmedValue.length < 2) error = 'Full name must be at least 2 characters';
        if (!trimmedValue.includes(' ')) error = 'Please enter your full name (First & Last)';
        break;
      case 'bio':
        if (trimmedValue.length < 30) error = `Tell us more! (${30 - trimmedValue.length} more characters needed)`;
        if (trimmedValue.length > 1500) error = 'Bio is too long (max 1500)';
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
      await addDoc(collection(db, 'creatorApplications'), {
        ...formData,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        platform: '',
        niche: '',
        followerCount: '',
        bio: '',
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
          <h3 className="text-2xl font-medium text-white tracking-tight">Network Entry Request Logged.</h3>
          <p className="text-gray-500 text-sm font-light italic max-w-xs">
            We are analyzing your profile for compatibility. You will be notified of matching opportunities.
          </p>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <button 
            onClick={() => setStatus('idle')}
            className="w-full py-4 bg-white text-black font-bold text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-gray-200 transition-all shadow-lg active:scale-[0.98]"
          >
            Back to Portal
          </button>
          <a 
            href="mailto:inflow.collabs@gmail.com?subject=Creator Inquiry: Network Registration"
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
      <FormField id="fullName" label="Full Name" error={errors.fullName} isValid={isValid('fullName')} required>
        <input 
          name="fullName"
          placeholder="e.g. Anmol Tandon"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormField>

      <FormField id="email" label="Email Address" error={errors.email} isValid={isValid('email')} required>
        <input 
          name="email"
          type="email"
          placeholder="you@email.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormField>

      <FormField id="platform" label="Primary Platform" error={errors.platform} isValid={isValid('platform')} required>
        <select 
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" disabled>Where's your main audience?</option>
          <option value="instagram">Instagram</option>
          <option value="youtube">YouTube</option>
          <option value="shorts">YouTube Shorts</option>
          <option value="linkedin">LinkedIn</option>
          <option value="multiple">Multiple Platforms</option>
        </select>
      </FormField>

      <FormField id="niche" label="Your Niche" error={errors.niche} isValid={isValid('niche')} required>
        <select 
          name="niche"
          value={formData.niche}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" disabled>What do you create?</option>
          <option value="fashion">Fashion & Style</option>
          <option value="tech">Tech Reviews</option>
          <option value="fitness">Fitness & Health</option>
          <option value="beauty">Beauty & Makeup</option>
          <option value="finance">Finance & Business</option>
          <option value="travel">Travel & Vlogs</option>
          <option value="comedy">Comedy & Entertainment</option>
          <option value="other">Other</option>
        </select>
      </FormField>

      <FormField id="followerCount" label="Follower Count" error={errors.followerCount} isValid={isValid('followerCount')} required>
        <select 
          name="followerCount"
          value={formData.followerCount}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          <option value="" disabled>Approximate reach</option>
          <option value="1-10k">1,000 – 10,000</option>
          <option value="10-50k">10,000 – 50,000</option>
          <option value="50-100k">50,000 – 1,00,000</option>
          <option value="100-500k">1,00,000 – 5,00,000</option>
          <option value="500kplus">50,0000+</option>
        </select>
      </FormField>

      <FormField 
        id="bio" 
        label="About You" 
        error={errors.bio} 
        isValid={isValid('bio')} 
        required
      >
        <div className="relative">
          <textarea 
            name="bio"
            placeholder="Tell us about your content style, audience demographics, and past collaborations..."
            value={formData.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            className="min-h-[150px] resize-none"
          />
          <div className={cn(
            "absolute bottom-3 right-3 text-[9px] font-mono font-bold",
            formData.bio.length < 30 ? "text-gray-700" : formData.bio.length > 1400 ? "text-red-400" : "text-gray-500"
          )}>
            {formData.bio.length} / 1500
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
          "Submit Creator Application →"
        )}
      </button>
      
      <p className="text-[0.7rem] text-gray-500 text-center leading-relaxed">
        🔒 All details stay private. <br/>Brands never see your direct contact info.
      </p>
    </form>
  );
}
