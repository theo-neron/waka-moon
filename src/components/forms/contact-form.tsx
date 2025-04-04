import React from 'react';
import { Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ContactFormProps {
  email: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ContactForm({ email, onChange }: ContactFormProps) {
  return (
    <Card className="border-0 bg-slate-800/60 backdrop-blur-sm shadow-xl overflow-hidden">
      <CardHeader className="border-b border-slate-700/50 pb-3 bg-slate-800/80">
        <CardTitle className="flex items-center gap-2 text-xl text-white">
          <Mail className="w-5 h-5 text-cyan-400" />
          Contact
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">Email pour recevoir l'étude</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={onChange}
            required
            placeholder="votre.email@exemple.com"
            className="bg-slate-900/60 border-slate-700 focus:border-cyan-400 focus:ring-cyan-400/20"
          />
        </div>
      </CardContent>
    </Card>
  );
}