"use client";

import React, { useState } from "react";
import { MapPin, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { useToastStore } from "@/lib/store/useToastStore";

export interface Address {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  fullAddress: string;
  isDefault: boolean;
}

export interface AddressesTabProps {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
}

export function AddressesTab({ addresses, setAddresses }: AddressesTabProps) {
  const { addToast } = useToastStore();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [title, setTitle] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("İstanbul");
  const [district, setDistrict] = useState("Kadıköy");
  const [fullAddress, setFullAddress] = useState("");

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
    addToast({
      title: "Varsayılan Adres Güncellendi",
      message: "Teslimat adresiniz başarıyla ayarlandı.",
      type: "info",
    });
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    addToast({
      title: "Adres Silindi",
      message: "Adres kaydınız kaldırıldı.",
      type: "info",
    });
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !fullAddress) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      title,
      fullName: fullName || "Caner Kaya",
      phone: phone || "0532 123 45 67",
      city,
      district,
      fullAddress,
      isDefault: addresses.length === 0,
    };

    setAddresses((prev) => [...prev, newAddr]);
    setIsAddingNew(false);
    setTitle("");
    setFullAddress("");

    addToast({
      title: "Yeni Adres Eklendi",
      message: `${title} başarıyla adres defterinize kaydedildi.`,
      type: "success",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-outline-variant pb-2">
        <h2 className="font-headline-sm uppercase text-primary text-base">
          Kayıtlı Adreslerim ({addresses.length})
        </h2>
        <button
          type="button"
          onClick={() => {
            setIsAddingNew(!isAddingNew);
          }}
          className="bg-primary text-on-primary hover:bg-surface-variant hover:text-primary border border-primary px-3 py-1.5 font-label-mono text-xs uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{isAddingNew ? "İptal" : "Yeni Adres Ekle"}</span>
        </button>
      </div>

      {/* Add New Address Inline Form */}
      {isAddingNew && (
        <form
          onSubmit={handleCreateAddress}
          className="border-2 border-primary p-5 bg-surface flex flex-col gap-4 font-label-mono text-xs animate-in fade-in duration-200"
        >
          <h3 className="font-bold uppercase text-primary text-sm">YENİ ADRES BİLGİLERİ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-on-surface-variant uppercase mb-1">ADRES BAŞLIĞI *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Örn: Yazlık / Depo"
                className="w-full bg-surface border border-primary p-2.5 uppercase"
              />
            </div>
            <div>
              <label className="block text-on-surface-variant uppercase mb-1">AD SOYAD *</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Caner Kaya"
                className="w-full bg-surface border border-primary p-2.5 uppercase"
              />
            </div>
            <div>
              <label className="block text-on-surface-variant uppercase mb-1">TELEFON *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0532 123 45 67"
                className="w-full bg-surface border border-primary p-2.5 uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-on-surface-variant uppercase mb-1">İL *</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-surface border border-primary p-2.5 uppercase"
              />
            </div>
            <div>
              <label className="block text-on-surface-variant uppercase mb-1">İLÇE *</label>
              <input
                type="text"
                required
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-surface border border-primary p-2.5 uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-on-surface-variant uppercase mb-1">AÇIK ADRES *</label>
            <textarea
              required
              rows={2}
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
              placeholder="Mahalle, cadde, kapı no..."
              className="w-full bg-surface border border-primary p-2.5 uppercase resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-on-primary hover:bg-surface-variant hover:text-primary border border-primary py-3 uppercase tracking-widest font-bold cursor-pointer"
          >
            Adresi Kaydet
          </button>
        </form>
      )}

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-label-mono text-xs">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`border p-5 bg-surface flex flex-col justify-between gap-4 transition-colors ${
              addr.isDefault
                ? "border-primary ring-1 ring-primary"
                : "border-outline-variant hover:border-primary"
            }`}
          >
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary text-sm flex items-center gap-1.5 uppercase">
                  <MapPin className="w-4 h-4 text-primary" /> {addr.title}
                </span>
                {addr.isDefault ? (
                  <span className="bg-primary text-on-primary px-2 py-0.5 text-[10px] uppercase font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Varsayılan
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-on-surface-variant hover:text-primary underline text-[11px] uppercase cursor-pointer"
                  >
                    Varsayılan Yap
                  </button>
                )}
              </div>

              <p className="text-primary font-bold">{addr.fullName}</p>
              <p className="text-on-surface-variant leading-relaxed uppercase">{addr.fullAddress}</p>
              <p className="text-on-surface-variant uppercase">{addr.district} / {addr.city}</p>
              <p className="text-on-surface-variant">{addr.phone}</p>
            </div>

            <div className="border-t border-outline-variant pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => handleDelete(addr.id)}
                className="text-red-600 hover:opacity-70 flex items-center gap-1 text-[11px] uppercase cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
