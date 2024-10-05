const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51OdtnTFROKRGb9NfyBuRBAAT3xe3UWx2GUWfVUgWIDVzgTjCuXKlYkXfuL5Sn2PidBOnXXyrJEPNTrznowe0voq000UnFuIRim"
);

router.post("/payment", (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
      product_data: req.body.products,
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
