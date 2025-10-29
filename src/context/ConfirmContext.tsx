import { createContext, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ConfirmContextType {
  confirm: (message: string) => Promise<boolean>;
}

export const ConfirmContext = createContext<ConfirmContextType | null>(null);

export const ConfirmProvider = ({ children }: { children: React.ReactNode }) => {
    const [message, setMessage] = useState("");
    const [resolver, setResolver] = useState<any>(null);

    const confirm = (msg: string) => 
        new Promise<boolean>((resolver) => {
            setMessage(msg);
            setResolver(() => resolver)
        });

    const handleClose = (result: boolean) => {
        setResolver(null);
        setMessage("");
        resolver?.(result)
    };

    return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      {/* Dialog xác nhận */}
      <Dialog open={!!resolver} onOpenChange={() => handleClose(false)}>
        <DialogContent className="max-w-sm rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-normal text-center text-gray-600">
              {message}
            </DialogTitle>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => handleClose(false)}
              className="w-24"
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleClose(true)}
              className="w-28"
            >
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmContext.Provider>
  );
}
