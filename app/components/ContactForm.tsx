"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "This field is required",
  }),
  lastName: z.string().min(2, {
    message: "This field is required",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  queryType: z.enum(["General Enquiry", "Support Request"], {
    required_error: "Please select a query type.",
  }),
  message: z.string().min(10, {
    message: "This field is required",
  }),
  consent: z.boolean().refine(value => value === true, {
    message: "To submit this form, please consent to being contacted",
  }),
})

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      consent: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send the form data to your server
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-black">First Name *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={fieldState.invalid ? "border-red" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-black">Last Name *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={fieldState.invalid ? "border-red" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-black">Email Address *</FormLabel>
              <FormControl>
                <Input
                  placeholder="johndoe@example.com"
                  {...field}
                  className={fieldState.invalid ? "border-red" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="queryType"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-black">Query Type *</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div
                    className={`border rounded-md p-2 ${
                      fieldState.invalid ? "border-red" : ""
                    }`}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="General Enquiry" />
                      </FormControl>
                      <FormLabel className="font-normal text-black">
                        General Enquiry
                      </FormLabel>
                    </FormItem>
                  </div>
                  <div
                    className={`border rounded-md p-2 mt-2 ${
                      fieldState.invalid ? "border-red" : ""
                    }`}
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="Support Request" />
                      </FormControl>
                      <FormLabel className="font-normal text-black">
                        Support Request
                      </FormLabel>
                    </FormItem>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-black">Message *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type your message here."
                  className={`resize-none h-52 ${
                    fieldState.invalid ? "border-red" : ""
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <div className="space-y-1 leading-none">
                <FormLabel className="text-black">
                  I consent to being contacted by the team *
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}
