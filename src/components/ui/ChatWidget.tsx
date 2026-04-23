"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, CheckCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type State = "idle" | "open" | "loading" | "success" | "error";

export function ChatWidget() {
  const t = useTranslations("chat");
  const [state, setState] = useState<State>("idle");
  const [showHint, setShowHint] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errorText, setErrorText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Показываем подсказку через 4 секунды после загрузки
  useEffect(() => {
    const t = setTimeout(() => setShowHint(true), 4000);
    return () => clearTimeout(t);
  }, []);

  // Фокус на поле сообщения при открытии
  useEffect(() => {
    if (state === "open") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [state]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    setState("loading");
    setErrorText("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), message: message.trim() }),
      });

      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
      setErrorText(t("error"));
      setTimeout(() => setState("open"), 3000);
    }
  }

  function handleOpen() {
    setShowHint(false);
    setState("open");
  }

  function handleClose() {
    setState("idle");
    // Не сбрасываем форму — пользователь мог начать вводить
  }

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-2">
      {/* Диалоговое окно */}
      {(state === "open" || state === "loading" || state === "error" || state === "success") && (
        <div className="w-[320px] sm:w-[360px] bg-white shadow-2xl border border-navy/10 flex flex-col overflow-hidden animate-slide-up">
          {/* Шапка */}
          <div className="bg-navy px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
                  <MessageCircle size={16} className="text-gold" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-navy" />
              </div>
              <div>
                <div className="font-serif text-sm font-semibold text-white">Оксана Яценко</div>
                <div className="font-sans text-xs text-white/50">{t("response_time")}</div>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white/40 hover:text-white transition-colors"
              aria-label={t("aria_close")}
            >
              <X size={18} />
            </button>
          </div>

          {/* Тело */}
          <div className="flex-1 overflow-y-auto">
            {state === "success" ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center">
                <CheckCircle size={40} className="text-green-500" />
                <p className="font-serif text-lg text-navy">{t("success_title")}</p>
                <p className="font-sans text-sm text-navy/60">{t("success_desc")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
                {/* Приветственное сообщение */}
                <div className="bg-cream px-4 py-3 text-sm font-sans text-navy/70 leading-relaxed">
                  {t("greeting")}
                </div>

                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder={t("placeholder_name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-navy/20 px-3 py-2.5 font-sans text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-gold transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder={t("placeholder_phone")}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-navy/20 px-3 py-2.5 font-sans text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-gold transition-colors"
                  />
                  <textarea
                    ref={inputRef}
                    placeholder={t("placeholder_message")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    required
                    className="w-full border border-navy/20 px-3 py-2.5 font-sans text-sm text-navy placeholder:text-navy/30 focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>

                {errorText && (
                  <p className="font-sans text-xs text-red-500">{errorText}</p>
                )}

                <button
                  type="submit"
                  disabled={state === "loading" || !message.trim()}
                  className={cn(
                    "w-full bg-gold text-white font-sans text-sm font-semibold uppercase tracking-wider py-3 flex items-center justify-center gap-2 transition-opacity",
                    (state === "loading" || !message.trim()) ? "opacity-60 cursor-not-allowed" : "hover:opacity-90"
                  )}
                >
                  {state === "loading" ? (
                    <><Loader2 size={15} className="animate-spin" /> {t("sending")}</>
                  ) : (
                    <><Send size={15} /> {t("send")}</>
                  )}
                </button>

                <p className="font-sans text-xs text-navy/40 text-center">
                  {t("or_telegram")}{" "}
                  <a
                    href="https://t.me/Oksana_Iatsenko"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    Telegram
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Подсказка */}
      {state === "idle" && showHint && (
        <div
          className="flex items-center gap-2 bg-navy text-white pl-4 pr-5 py-3 shadow-xl cursor-pointer hover:bg-navy/90 transition-colors animate-slide-up"
          onClick={handleOpen}
        >
          <MessageCircle size={16} className="text-gold flex-shrink-0" />
          <span className="font-sans text-sm font-semibold">{t("hint")}</span>
        </div>
      )}

      {/* Кнопка-пузырь */}
      <button
        onClick={state === "idle" || state === "success" ? handleOpen : handleClose}
        aria-label={t("aria_open")}
        className={cn(
          "w-14 h-14 flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-105",
          state === "idle" || state === "success" ? "bg-navy text-white" : "bg-navy/80 text-white"
        )}
      >
        {state === "open" || state === "loading" || state === "error" ? (
          <X size={22} />
        ) : (
          <MessageCircle size={22} />
        )}
      </button>
    </div>
  );
}
