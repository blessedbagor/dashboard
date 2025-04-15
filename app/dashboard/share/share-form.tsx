"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { affiliateFormDefaultValues } from "@/lib/constants";
import { insertAffiliateLinkSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { createUpdateShareService, getShareServiceById } from "@/lib/actions/affiliate.actions";

const ShareForm = ({ userId, onAffiliateLinkSubmitted }: { userId: string; onAffiliateLinkSubmitted: () => void }) => {
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertAffiliateLinkSchema>>({
    resolver: zodResolver(insertAffiliateLinkSchema),
    defaultValues: affiliateFormDefaultValues,
  });

  // Open Form Handler
  const handleOpenForm = async() => {
    form.setValue("userId", userId);

    const share = await getShareServiceById();

    if (share) {
      form.setValue('referralCode', share.referralCode);
      form.setValue('affiliateLink', share.affiliateLink);
    }

    setOpen(true); 
  };

  // Submit Form Handler
  const onSubmit: SubmitHandler<z.infer<typeof insertAffiliateLinkSchema>> = async (values) => {
    const res = await createUpdateShareService({ ...values });

    if (!res.success) {
      return toast({
        variant: "destructive",
        description: res.message,
      });
    }

    setOpen(false);

    onAffiliateLinkSubmitted();

    toast({
      description: res.message,
    });
  };

  return (
    <>
    <Button onClick={handleOpenForm} variant="default">
        Setup Share Service
    </Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] p-4">
        <Form {...form}>
          <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Setup Share Service</DialogTitle>
              <DialogDescription>
                Enter your username and referral link from iGiftMIT.com to use the service.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Referral Code Field with Error Message */}
              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Referral Code</FormLabel>
                    <FormControl>
                      <Input className="w-full" placeholder="Enter your iGiftMIT.com Username" {...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.referralCode?.message}</FormMessage>
                  </FormItem>
                )}
              />
              {/* Affiliate Link Field with Error Message */}
              <FormField
                control={form.control}
                name="affiliateLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Affiliate Link</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your iGiftMIT.com Referral Link" className="w-full h-24 resize-none"{...field} />
                    </FormControl>
                    <FormMessage>{form.formState.errors.affiliateLink?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
};

export default ShareForm;
