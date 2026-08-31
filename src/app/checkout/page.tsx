"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { CheckoutShippingForm } from "@/components/checkout/checkout-shipping-form";
import { CheckoutPaymentForm } from "@/components/checkout/checkout-payment-form";
import { CheckoutOrderSummary } from "@/components/checkout/checkout-order-summary";

const emptySubscribe = () => () => {};

export default function CheckoutPage() {
  const router = useRouter();
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const { items, getSubtotal, clearCart } = useCartStore();
  const { user, isAuthenticated } = useAuthStore();

  const defaultAddr = user?.addresses.find((a) => a.isDefault) || user?.addresses[0];
  const nameParts = (user?.name || "").split(" ");

  // Form State
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [firstName, setFirstName] = useState(nameParts[0] || "");
  const [lastName, setLastName] = useState(nameParts.slice(1).join(" ") || "");
  const [city, setCity] = useState(defaultAddr?.city || "İstanbul");
  const [district, setDistrict] = useState(defaultAddr?.district || "Kadıköy");
  const [address, setAddress] = useState(defaultAddr?.addressDetail || "");
  const [postalCode, setPostalCode] = useState("34710");

  // Gift options
  const [isGift, setIsGift] = useState(false);
  const [giftNote, setGiftNote] = useState("");

  // Shipping & Payment
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank" | "cod">("card");

  // Card details
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Coupon
  const [couponInput, setCouponInput] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isMounted) return null;

  const subtotal = getSubtotal();
  const isFreeShipping = subtotal >= 1500;
  const shippingCost = shippingMethod === "express" ? 150 : isFreeShipping ? 0 : 60;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === "CLOST10" || code === "VOID10" || code === "HOSGELDIN10") {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError("");
    } else if (code === "CLOST15" || code === "VOID15") {
      setDiscountPercent(15);
      setCouponApplied(true);
      setCouponError("");
    } else if (code === "CLOST20" || code === "VOID20") {
      setDiscountPercent(20);
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Geçersiz kupon kodu. Deneyin: CLOST10 veya HOSGELDIN10");
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsProcessing(true);

    const generatedOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}-TR`;

    setTimeout(() => {
      clearCart();
      const queryParams = new URLSearchParams({
        orderId: generatedOrderId,
        total: total.toString(),
        name: `${firstName} ${lastName}`.trim() || "Değerli Müşterimiz",
        isGift: isGift ? "true" : "false",
        giftNote: giftNote,
      });
      router.push(`/checkout/success?${queryParams.toString()}`);
    }, 1200);
  };

  if (items.length === 0) {
    return (
      <main className="flex-grow pt-24 pb-16 flex flex-col items-center justify-center text-center p-6">
        <div className="border border-primary p-12 max-w-md w-full bg-surface flex flex-col items-center gap-4">
          <ShoppingBag className="w-12 h-12 text-primary stroke-1" />
          <h1 className="font-headline-sm uppercase text-primary text-xl">
            Sepetiniz Boş
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant max-w-xs">
            Ödeme adımına geçebilmek için lütfen sepetinize en az bir ürün ekleyin.
          </p>
          <Link
            href="/collections/all"
            className="mt-4 bg-primary text-on-primary font-label-mono text-xs px-8 py-3.5 uppercase tracking-widest hover:bg-surface-variant hover:text-primary border border-primary transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Kataloğu Keşfet</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow pt-20 pb-16 bg-surface-container-low min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="py-6 border-b border-primary mb-8 flex justify-between items-center bg-surface p-4">
          <div>
            <span className="font-label-mono text-[10px] uppercase text-on-surface-variant block">
              GÜVENLİ ÖDEME // 256-BIT SSL KORUMALI
            </span>
            <h1 className="font-headline-sm uppercase text-primary text-xl md:text-2xl">
              Siparişi Tamamla
            </h1>
          </div>
          <Link
            href="/collections/all"
            className="font-label-mono text-xs uppercase text-on-surface-variant hover:text-primary underline"
          >
            Alışverişe Devam Et
          </Link>
        </header>

        <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Shipping & Payment Forms */}
          <div className="lg:col-span-7 flex flex-col">
            <CheckoutShippingForm
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              city={city}
              setCity={setCity}
              district={district}
              setDistrict={setDistrict}
              address={address}
              setAddress={setAddress}
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              shippingMethod={shippingMethod}
              setShippingMethod={setShippingMethod}
              isFreeShipping={isFreeShipping}
              isGift={isGift}
              setIsGift={setIsGift}
              giftNote={giftNote}
              setGiftNote={setGiftNote}
            />

            <CheckoutPaymentForm
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              cardHolder={cardHolder}
              setCardHolder={setCardHolder}
              cardExpiry={cardExpiry}
              setCardExpiry={setCardExpiry}
              cardCvv={cardCvv}
              setCardCvv={setCardCvv}
            />
          </div>

          {/* Right Column: Order Summary & Checkout Trigger */}
          <CheckoutOrderSummary
            items={items}
            subtotal={subtotal}
            discountAmount={discountAmount}
            discountPercent={discountPercent}
            shippingCost={shippingCost}
            total={total}
            couponInput={couponInput}
            setCouponInput={setCouponInput}
            couponApplied={couponApplied}
            couponError={couponError}
            onApplyCoupon={handleApplyCoupon}
            isProcessing={isProcessing}
            onCompleteOrder={handleCompleteOrder}
          />
        </form>
      </div>
    </main>
  );
}
