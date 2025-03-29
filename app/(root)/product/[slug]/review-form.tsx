'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { reviewFormDefaultValues } from "@/lib/constants";
import { insertReviewSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { createUpdateReview, getReviewByProductId } from "@/lib/actions/review.actions";

const ReviewForm = ({ userId, productId, onReviewSubmitted }: {
  userId: string;
  productId: string;
  onReviewSubmitted: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0); // Store selected star rating
  const { toast } = useToast();

  const form = useForm<z.infer<typeof insertReviewSchema>>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: { ...reviewFormDefaultValues, rating },
  });

  // Open form handler
  const handleOpenForm = async() => {
    form.setValue("productId", productId);
    form.setValue("userId", userId);

    const review = await getReviewByProductId({productId});

    if (review) {
      form.setValue('title', review.title);
      form.setValue('description', review.description);
      form.setValue('rating', review.rating);
      setRating(review.rating);

    }

    setOpen(true);
  };

  // Render individual star with animation and click handling
  const renderStar = (index: number) => (
    <motion.div
      key={index}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setRating(index);
        form.setValue("rating", index);
      }}
    >
      <Star
        className={`h-8 w-8 cursor-pointer transition-colors fill-current ${
          index <= rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    </motion.div>
  );

  // Submit Form handler
  const onSubmit: SubmitHandler<z.infer<typeof insertReviewSchema>> = async (values) => {
    const res = await createUpdateReview({ ...values, productId });

    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
      return;
    }

    setOpen(false);
    onReviewSubmitted();
    toast({
      description: res.message,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={handleOpenForm} variant="default" className="my-4">
        Write a Review
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form method="POST" onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Write a Review</DialogTitle>
              <DialogDescription>Share your thoughts with other customers</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter title" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter description" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Star Rating System */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(renderStar)}
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit" variant="default" disabled={form.formState.isSubmitting} className="w-full">
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
