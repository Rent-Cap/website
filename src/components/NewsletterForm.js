import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from "@material-ui/core";
import "./NewsletterForm.scss";
import { PrimaryButton2 } from "./Buttons";

const NewsletterForm = ({ location }) => {
  const [success, setSuccess] = useState(false);
  const actionUrl = location.href
    ? new URL(location.href)
    : new URL(process.env.GATSBY_CONTEXT_URL);
  actionUrl.searchParams.append("contact", "success");

  useEffect(() => {
    if (location) {
      const { searchParams } = new URL(location.href);
      if (searchParams.get("contact")) {
        setSuccess(true);
      }
    }
  }, [location]);

  return (
    <form
      name="newsletterSubscribe"
      data-netlify="true"
      id="newsletterSubscribe"
      method="post"
      action={actionUrl.href}
    >
      {success ? (
        <p>Thank you for subscribing!</p>
      ) : (
        <>
          <span className="notice">
            Subscribe to newsletter from Housing Now!
          </span>
          <FormControl>
            <InputLabel htmlFor="newsletter-email">Email Address</InputLabel>
            <Input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              style={{ boxSizing: "initial", border: "0" }}
            />
          </FormControl>
          <input type="hidden" name="form-name" value="contact" />
          <PrimaryButton2 className="primaryButton" type="submit">
            →
          </PrimaryButton2>
        </>
      )}
    </form>
  );
};

export default NewsletterForm;
