'use client';

import { MessageCircle } from 'lucide-react';
import { emit } from '@/lib/events';

export function OpenChatButton({
  className,
  label = 'Ask my AI assistant',
  prompt,
}: {
  className?: string;
  label?: string;
  prompt?: string;
}) {
  return (
    <button type="button" className={className} onClick={() => emit('open-chat', prompt)}>
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
