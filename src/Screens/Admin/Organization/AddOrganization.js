import React, { useState, useRef } from "react";
import {
  Box, Grid, Typography, TextField, Button, IconButton, InputAdornment,
  FormControlLabel, Radio, RadioGroup, FormLabel
} from "@mui/material";
import Map from "../../../components/Map";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";

export default function AddOrganization(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  return (
      <Box component="form" onSubmit={props.handleSubmit} sx={{p:3}}>
        <Grid container spacing={3} sx={{placeContent: "center"}}>
          <Grid item xs={6}>
            <Typography variant="subtitle1" color="primary" className="font-bold m-2 font-gray">
              {props.btn} Organization
            </Typography>
          </Grid>
          <Grid item xs={6} align='right'>
            <IconButton color="primary" aria-label="upload picture" component="label" onClick={props.onClose}>
              <Close />
            </IconButton>
          </Grid>
          {props.btn == 'Add' && <>
            <Grid item xs={12}>
              <TextField
                id="standard-error-helper-text"
                label="Email Address"
                fullWidth
                type="email"
                name="email"
                value={props.inputField['email']}
                onChange={props.handleChange}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="standard-password-input"
                label="Password"
                fullWidth
                name="password"
                type={(showPassword) ? 'text':'password'}
                autoComplete="current-password"
                onChange={props.handleChange}
                value={props.inputField['password']}
                size="small"
                InputProps={{ 
                  // pattern: /^[a-zA-Z0-9]*$/,
                  // title: "Only numbers and alphabets are allowed",
                  endAdornment: <InputAdornment position="end">
                      <IconButton
                          onClick={()=>setShowPassword(!showPassword)}
                          edge="end"
                      >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                  </InputAdornment>
                }}
                required
              />
            </Grid>
          </>}
          <Grid item xs={12}>
            <TextField
                id="standard-error-helper-text"
                label="Organization Name"
                color="secondary"
                type="text"
                name="org_name"
                value={props.inputField["org_name"]}
                onChange={props.handleChange}
                size="small"
                required
                fullWidth
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
                id="standard-error-helper-text"
                label="Sub Domain"
                color="secondary"
                helperText={
                  "https://" +
                  ((props.inputField["sub_domain"] !== undefined && props.inputField["sub_domain"] !== '') ?
                    props.inputField["sub_domain"] + "." : '')+
                  "connectedparking.ca/"
                }
                type="text"
                name="sub_domain"
                value={props.inputField["sub_domain"]}
                onChange={props.handleChange}
                InputLabelProps={{ shrink: (props.inputField["sub_domain"] !== undefined) ? true : false }}
                size="small"
                required
                fullWidth
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
                id="standard-error-helper-text"
                label="Service Fee (in cents)"
                color="secondary"
                type="number"
                name="service_fee"
                value={props.inputField["service_fee"]}
                onChange={props.handleChange}
                size="small"
                required
                fullWidth
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
                id="standard-error-helper-text"
                label="Theme Color"
                color="secondary"
                type="color"
                name="color"
                value={props.inputField["color"]}
                onChange={props.handleChange}
                InputLabelProps={{ shrink: true }}
                size="small"
                required
                fullWidth
              />
          </Grid>
          <Grid item xs={12}>
            <TextField
                id="standard-error-helper-text"
                label="Logo"
                color="secondary"
                type="file"
                name="logo"
                onChange={(e)=>props.setLogo(e.target.files[0])} 
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
          </Grid>
          {props.btn == 'Add' && <>
            <Grid item xs={12}>
              <FormLabel id="demo-radio-buttons-group-label">Payment Gateway</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="payment_gateway"
              >
                <FormControlLabel value="stripe" sx={{color: "#2c3680"}} control={
                  <Radio
                    checked={props.inputField["payment_gateway"] === 'stripe'}
                    onChange={props.handleChange}
                  />} label="Stripe" />
                <FormControlLabel value="moneris" sx={{color: "#2c3680"}} control={
                  <Radio
                    checked={props.inputField["payment_gateway"] === 'moneris'}
                    onChange={props.handleChange}
                  />} label="Moneris" />
              </RadioGroup>
            </Grid>
            {props.inputField["payment_gateway"] === 'stripe' && <>
              <Grid item xs={12}>
                <TextField
                    id="standard-error-helper-text"
                    label="Publishable Key"
                    color="secondary"
                    type="text"
                    name="stripe_publishable_key"
                    value={props.inputField["stripe_publishable_key"]}
                    onChange={props.handleChange}
                    size="small"
                    required
                    fullWidth
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="standard-error-helper-text"
                    label="Secret Key"
                    color="secondary"
                    helperText={
                    <>
                      <Typography variant="caption" display="block">
                        1. Sign in to your Stripe account.
                      </Typography>
                      <Typography variant="caption" display="block">
                        2. In your <a href="https://dashboard.stripe.com/login?redirect=%2Fdevelopers" target="_blank">dashboard</a>, click “Developers”, then “API keys”.
                      </Typography>
                      <Typography variant="caption" display="block">
                        3. On the “API keys” page, you can find both your publishable and secret keys under “Standard keys”.
                      </Typography>
                    </>}
                    type="text"
                    name="stripe_secret_key"
                    value={props.inputField["stripe_secret_key"]}
                    onChange={props.handleChange}
                    size="small"
                    required
                    fullWidth
                  />
              </Grid>
            </>}
            {props.inputField["payment_gateway"] === 'moneris' && <>
              <Grid item xs={12}>
                <TextField
                    id="standard-error-helper-text"
                    label="Store ID"
                    color="secondary"
                    helperText="Your Store ID is sent to you in the Welcome email when you first sign up for an account with Moneris"
                    type="text"
                    name="moneris_store_id"
                    value={props.inputField["moneris_store_id"]}
                    onChange={props.handleChange}
                    size="small"
                    required
                    fullWidth
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="standard-error-helper-text"
                    label="API Token"
                    color="secondary"
                    helperText="Inside the Moneris Gateway merchant account, you need to obtain an API Token. Go to My Account and click on the ADMIN. Then click on Store Settings and click on the button to generate an API Token."
                    type="text"
                    name="moneris_api_token"
                    value={props.inputField["moneris_api_token"]}
                    onChange={props.handleChange}
                    size="small"
                    required
                    fullWidth
                  />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    id="standard-error-helper-text"
                    label="Checkout ID"
                    color="secondary"
                    helperText={
                    <>
                      <Typography variant="caption" display="block">
                        To get the checkout ID and start configuring your page, do the following:
                      </Typography>
                      <Typography variant="caption" display="block">
                        1. Log into the Merchant Resource Center at one of the following URLs (according to your stage of development)
                      </Typography>
                      <Typography variant="caption" display="block">
                        &nbsp;&nbsp;Testing: <a href="https://esqa.moneris.com/mpg" target="_blank">https://esqa.moneris.com/mpg</a>&nbsp;
                        Production: <a href="https://www3.moneris.com/mpg" target="_blank">https://www3.moneris.com/mpg</a>
                      </Typography>
                      <Typography variant="caption" display="block">
                        2. In the Admin menu, select Moneris Checkout Config
                      </Typography>
                      <Typography variant="caption" display="block">
                        3. Click the Create Profile button
                      </Typography>
                      <Typography variant="caption" display="block">
                        4. Follow the on-screen steps to complete the configuration
                      </Typography>
                    </>}
                    type="text"
                    name="moneris_checkout_id"
                    value={props.inputField["moneris_checkout_id"]}
                    onChange={props.handleChange}
                    size="small"
                    required
                    fullWidth
                  />
                
              </Grid>
            </>}
          </>}
          <Grid item xs={12} align="right">
            <Button 
              type="button"
              color="secondary"
              variant="contained"
              onClick={props.onClose}
              size="small"
              sx={{mx: 2}}>
                Cancel
            </Button>
            <Button 
              type="submit"
              color="primary"
              variant="contained"
              size="small">
                {props.btn}
            </Button>
          </Grid>
        </Grid>
    </Box>
  );
}
