"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function HomePage() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const plans = useMemo(() => {
    const yearly = billing === "yearly";

    return [
      {
        name: "Starter",
        price: "免費",
        desc: "適合先體驗產品感與建立基本流程。",
        items: ["品牌首頁", "基礎 AI 互動", "Email 收集", "單人使用"],
        featured: false,
        button: "立即開始",
      },
      {
        name: "Pro",
        price: yearly ? "NT$1,590 / 月" : "NT$1,990 / 月",
        desc: "給想把 AI 助理、內容生成與產品流程真正做起來的人。",
        items: ["完整 Landing Page", "進階名單收集", "FAQ / CTA 模組", "高級視覺風格", "產品化版型"],
        featured: true,
        button: "升級 Pro",
      },
      {
        name: "Studio",
        price: yearly ? "NT$3,990 / 月" : "NT$4,990 / 月",
        desc: "適合品牌、創作者或團隊正式上線與持續優化。",
        items: ["自訂品牌風格", "多區塊產品頁", "高轉換 CTA", "優先支援", "後續擴充建議"],
        featured: false,
        button: "聯絡我們",
      },
    ];
  }, [billing]);

  const faqs = [
    {
      q: "這是網站還是 App？",
      a: "目前這版是正式可上線的網站首頁，可以在手機與電腦瀏覽器開啟。之後也可以再延伸做成真正的 Android / iOS App。",
    },
    {
      q: "我可以先用這個版本開始嗎？",
      a: "可以。這種做法最快，先上線、先收名單、先測市場，之後再逐步升級功能，比一開始就做完整 App 更省時間。",
    },
    {
      q: "名單真的有收到嗎？",
      a: "如果你前面 API 已經設定完成，表單送出後會打到你的 waitlist API。現在這版會保留可直接串接的送出邏輯。",
    },
    {
      q: "之後可以再改成別的風格嗎？",
      a: "可以，這份版型就是為了方便後續升級。你之後可以再改成蘋果感、黑金高級感、極簡品牌感，或更像手機 App 的介面。",
    },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailMessage("");
    setEmailError("");

    const value = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!value) {
      setEmailError("請先輸入 Email");
      return;
    }

    if (!emailRegex.test(value)) {
      setEmailError("Email 格式不正確");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: value }),
      });

      const data = await res.json();

      if (!res.ok) {
        setEmailError(data?.message || "送出失敗，請稍後再試");
        return;
      }

      setEmailMessage("已成功加入候補名單");
      setEmail("");
    } catch {
      setEmailError("系統暫時忙碌，請稍後再試");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(130,170,255,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12),transparent_20%),linear-gradient(180deg,#050816_0%,#070b1d_48%,#04070f_100%)]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-white/10" />
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-10">
          <header className="mb-10 flex items-center justify-between">
            <div className="text-sm font-semibold tracking-[0.28em] text-white/90">
              YOUR AI APP
            </div>

            <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
              <a href="#features" className="transition hover:text-white">
                功能
              </a>
              <a href="#workflow" className="transition hover:text-white">
                使用方式
              </a>
              <a href="#pricing" className="transition hover:text-white">
                價格方案
              </a>
              <a href="#faq" className="transition hover:text-white">
                FAQ
              </a>
            </nav>

            <a
              href="#waitlist"
              className="rounded-full border border-white/15 bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
            >
              立即開始
            </a>
          </header>

          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border border-cyan-300/15 bg-cyan-300/10 px-4 py-2 text-xs font-medium tracking-[0.24em] text-cyan-200">
                AI SAAS LANDING PAGE
              </div>

              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.04] tracking-tight md:text-7xl">
                極簡霓虹感，
                <br />
                真正像 AI SaaS
                <br />
                官網的首頁。
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/68 md:text-lg">
                幫你把想法整理成能上線的產品首頁，從品牌感、功能結構、CTA 到名單收集一次做好。
                現在不只是好看，而是能直接拿去用。
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#waitlist"
                  className="rounded-full bg-white px-7 py-3 text-center text-sm font-semibold text-black transition hover:opacity-90"
                >
                  立即開始
                </a>
                <a
                  href="#features"
                  className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10"
                >
                  查看功能
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/45">
                <span>深色科技感</span>
                <span>可收 Email 名單</span>
                <span>可直接部署</span>
                <span>Next.js 正式版</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2.5rem] bg-cyan-300/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0a1020]">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_20%,transparent_80%,rgba(255,255,255,0.02))]" />
                  <Image
                    src="/ai-hero.jpg"
                    alt="AI futuristic hero"
                    width={900}
                    height={1200}
                    priority
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07101c]/55 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="absolute bottom-4 right-4 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-3 py-1 text-xs font-medium text-cyan-100 backdrop-blur">
                    Live Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-8 md:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              title: "AI Workspace",
              desc: "幫你整理需求、品牌定位、功能模組與頁面內容，不再只是靈感，而是產品結構。",
            },
            {
              title: "Hero 模組",
              desc: "更高級的首屏視覺、清楚的賣點文案、精準 CTA，第一眼就有產品感。",
            },
            {
              title: "Waitlist API",
              desc: "現在就能收 Email 名單，先驗證市場，再慢慢擴功能，不浪費開發成本。",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
            >
              <div className="mb-4 inline-flex rounded-full border border-cyan-300/15 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                {item.title}
              </div>
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/62">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm tracking-[0.24em] text-cyan-200/80">WORKFLOW</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            從想法到上線，
            <br />
            用更省力的方式完成。
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["01", "整理定位", "先整理品牌感、目標受眾、產品重點，不再亂做一堆無效頁面。"],
            ["02", "建立首頁", "把首頁主視覺、功能區塊、CTA 與 FAQ 組成真正能看的正式版。"],
            ["03", "開始收名單", "上線後先收 Email、先測市場，再決定是否延伸成完整平台或 App。"],
          ].map(([no, title, desc]) => (
            <div
              key={no}
              className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-6"
            >
              <div className="text-sm tracking-[0.22em] text-cyan-200/75">{no}</div>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="mx-auto max-w-7xl px-6 py-6 md:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-[linear-gradient(135deg,rgba(9,18,36,0.96),rgba(7,10,18,0.98))] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)] md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm tracking-[0.26em] text-cyan-200/80">READY TO LAUNCH</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
                現在開始，
                <br />
                把它做成真正可用的產品。
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-white/65">
                這裡已經不是假表單了。你輸入 Email 後，會真的送到你的 Next.js API，
                再由你後續接到名單流程。
              </p>
            </div>

            <form onSubmit={handleSubmit} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
              <label className="mb-3 block text-sm text-white/70">輸入你的 Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full rounded-2xl border border-white/10 bg-[#0a1020] px-4 py-4 text-white outline-none placeholder:text-white/25 focus:border-cyan-200/30"
              />
              {emailMessage ? (
                <p className="mt-3 text-sm text-cyan-300">{emailMessage}</p>
              ) : null}
              {emailError ? (
                <p className="mt-3 text-sm text-red-300">{emailError}</p>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 w-full rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "送出中..." : "加入等候名單"}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm tracking-[0.24em] text-cyan-200/80">PRICING</p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              可直接開始的價格方案
            </h2>
            <p className="mt-3 max-w-2xl text-white/62">
              先從最適合你的版本開始，不需要一開始就做過重。
            </p>
          </div>

          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                billing === "monthly" ? "bg-white text-black" : "text-white/65"
              }`}
            >
              月付
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                billing === "yearly" ? "bg-white text-black" : "text-white/65"
              }`}
            >
              年付
            </button>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[1.8rem] border p-6 ${
                plan.featured
                  ? "border-cyan-200/25 bg-[linear-gradient(180deg,rgba(18,29,56,0.95),rgba(10,15,28,0.98))] shadow-[0_16px_60px_rgba(70,170,255,0.12)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                {plan.featured ? (
                  <span className="rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-xs text-cyan-100">
                    Most Popular
                  </span>
                ) : null}
              </div>
              <div className="mt-5 text-3xl font-semibold">{plan.price}</div>
              <p className="mt-3 text-sm leading-7 text-white/60">{plan.desc}</p>

              <ul className="mt-6 space-y-3 text-sm text-white/78">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-white text-black hover:opacity-90"
                    : "border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-5xl px-6 py-8 md:px-10 md:pb-20">
        <div className="mb-8">
          <p className="text-sm tracking-[0.24em] text-cyan-200/80">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
            常見問題
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const opened = openFaq === index;
            return (
              <div
                key={faq.q}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
              >
                <button
                  className="flex w-full items-center justify-between gap-6 text-left"
                  onClick={() => setOpenFaq(opened ? null : index)}
                >
                  <span className="text-base font-medium text-white">{faq.q}</span>
                  <span className="text-white/45">{opened ? "−" : "+"}</span>
                </button>
                {opened ? (
                  <p className="mt-4 max-w-4xl text-sm leading-7 text-white/62">
                    {faq.a}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/8 bg-[#04070e]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-4 md:px-10">
          <div>
            <div className="text-sm font-semibold tracking-[0.26em] text-white/92">
              YOUR AI APP
            </div>
            <p className="mt-4 text-sm leading-7 text-white/45">
              幫你把想法變成能上線的產品首頁，先驗證市場，再慢慢把它做大。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">產品</h3>
            <div className="mt-4 space-y-3 text-sm text-white/55">
              <a href="#features" className="block hover:text-white">
                功能
              </a>
              <a href="#pricing" className="block hover:text-white">
                價格方案
              </a>
              <a href="#faq" className="block hover:text-white">
                FAQ
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">資源</h3>
            <div className="mt-4 space-y-3 text-sm text-white/55">
              <a href="#" className="block hover:text-white">
                文件
              </a>
              <a href="#" className="block hover:text-white">
                使用教學
              </a>
              <a href="#" className="block hover:text-white">
                更新紀錄
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">聯絡</h3>
            <div className="mt-4 space-y-3 text-sm text-white/55">
              <a href="mailto:support@youraiapp.com" className="block hover:text-white">
                support@youraiapp.com
              </a>
              <a href="#" className="block hover:text-white">
                Instagram
              </a>
              <a href="#" className="block hover:text-white">
                Threads
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}