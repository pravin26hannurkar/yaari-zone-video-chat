# AdSense Setup Guide for YaariZone Video Chat

## Prerequisites

1. **Google AdSense Account**: You need an approved AdSense account
2. **Domain Ownership**: Your domain must be verified with Google
3. **SSL Certificate**: HTTPS is required for AdSense
4. **Content Policy Compliance**: Ensure your site follows AdSense policies

## Step 1: Get Your AdSense Publisher ID

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign in to your AdSense account
3. Go to "Ads" → "By ad unit" → "Ad units"
4. Copy your Publisher ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)

## Step 2: Configure Environment Variables

### Frontend (.env file)

Create a `.env` file in your frontend directory:

```env
VITE_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX
```

Replace `XXXXXXXXXXXXXXXX` with your actual Publisher ID.

### Backend (.env file)

If you need server-side ad management:

```env
ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
ADSENSE_SLOT_HEADER=1234567890
ADSENSE_SLOT_FOOTER=0987654321
ADSENSE_SLOT_SIDEBAR=2468135790
```

## Step 3: Create Ad Units in AdSense

1. **Header Banner** (728x90 or 320x50):
   - Name: "YaariZone Header Banner"
   - Size: Responsive
   - Save and get the ad unit code

2. **Footer Banner** (728x90 or 320x50):
   - Name: "YaariZone Footer Banner"
   - Size: Responsive
   - Save and get the ad unit code

3. **Sidebar Banner** (300x250):
   - Name: "YaariZone Sidebar Banner"
   - Size: 300x250
   - Save and get the ad unit code

## Step 4: Update Ad Slots in Code

Update the `AdBanner` component calls with your actual ad unit IDs:

```jsx
// In Home.jsx
<AdBanner slot="YOUR_HEADER_AD_UNIT_ID" className="w-full h-24" />
<AdBanner slot="YOUR_FOOTER_AD_UNIT_ID" className="w-full h-24" />

// In VideoChat.jsx
<AdBanner slot="YOUR_SIDEBAR_AD_UNIT_ID" className="w-full h-16" />
<AdBanner slot="YOUR_FOOTER_AD_UNIT_ID" className="w-full h-16" />
```

## Step 5: AdSense Policy Compliance

### Content Guidelines
- ✅ Age-appropriate content (18+ with verification)
- ✅ No prohibited content (violence, hate speech, etc.)
- ✅ Clear privacy policy
- ✅ Proper user consent for data collection

### Technical Requirements
- ✅ HTTPS enabled
- ✅ Mobile-friendly design
- ✅ Fast loading times
- ✅ No intrusive ads

## Step 6: Testing AdSense Integration

1. **Development Testing**:
   - Ads show as placeholders in development mode
   - No actual ads served until production

2. **Production Testing**:
   - Deploy to your domain
   - Use AdSense preview tool
   - Check ad delivery in different browsers/devices

## Step 7: Monitor Performance

### AdSense Dashboard
- Check impressions, clicks, and revenue
- Monitor ad fill rates
- Review blocked categories

### Optimization Tips
- **Placement**: Header/footer ads perform well
- **Size**: Responsive ads adapt to screen sizes
- **Frequency**: Don't overwhelm users with too many ads
- **Content**: High-quality content increases ad relevance

## Step 8: Revenue Optimization

### Best Practices
1. **Increase Traffic**: More users = more ad impressions
2. **Improve Engagement**: Longer session times improve ad performance
3. **Optimize Layout**: Ensure ads are visible and non-intrusive
4. **A/B Testing**: Test different ad placements and sizes

### Ad Formats to Consider
- **Display Ads**: Banner, rectangle, skyscraper
- **In-feed Ads**: Integrated into content flow
- **Anchored Ads**: Sticky ads that follow scrolling

## Troubleshooting

### Common Issues
1. **Ads not showing**: Check AdSense approval status
2. **Low fill rates**: Improve content quality and traffic
3. **Policy violations**: Review and fix content issues
4. **Technical issues**: Ensure proper ad unit implementation

### Support
- [AdSense Help Center](https://support.google.com/adsense)
- [AdSense Policy Center](https://support.google.com/adsense/answer/48182)
- [AdSense Community](https://support.google.com/adsense/community)

## Security Considerations

- Never expose AdSense client ID in client-side code without proper environment variables
- Use HTTPS to protect ad delivery
- Implement proper CSP (Content Security Policy) headers
- Regularly audit for ad injection vulnerabilities

## Legal Compliance

- Comply with GDPR for EU users
- Follow COPPA for users under 13
- Adhere to local advertising laws
- Maintain transparent ad labeling

## Next Steps

1. Apply for AdSense approval if not already approved
2. Set up your domain and SSL certificate
3. Deploy the application with ad integration
4. Monitor performance and optimize as needed
5. Scale traffic to increase revenue potential

---

**Note**: AdSense approval can take 1-2 weeks. Ensure your site meets all policy requirements before applying.
