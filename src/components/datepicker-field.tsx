import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface DatePickerFieldProps {
  label?: string;
  date: Date | null;
  onChange: (date: Date) => void;
}

export function DatePickerField({ label, date, onChange }: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {label && <span className="text-sm text-gray-500 mb-1">{label}</span>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[160px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
                mode="single"
                selected={date ?? undefined}
                onSelect={(d) => {
                    if (d) {
                    onChange(d);
                    setOpen(false);
                    }
                }}
                initialFocus
                className="[&_button]:text-base [&_button]:w-10 [&_button]:h-10 [&_button]:rounded-lg [&_.rdp-caption_label]:text-base [&_.rdp-day_selected]:bg-blue-500 [&_.rdp-day_selected]:text-white"
            />
        </PopoverContent>
      </Popover>
    </div>
  );
}
