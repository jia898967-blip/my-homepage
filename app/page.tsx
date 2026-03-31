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
        desc: "適合先驗證想法、建立首頁與收集第一批名單。",
        items: ["首頁版型", "基礎 AI 互動", "Email 收集", "單人使用"],
        featured: false,
        button: "立即開始",
      },
      {
        name: "Pro",
        price: yearly ? "NT$1,590 / 月" : "NT$1,990 / 月",
        desc: "適合想把品牌感、轉換率與產品體驗一次做好的版本。",
        items: ["完整品牌首頁", "進階 CTA 設計", "Waitlist 串接", "高級視覺風格", "產品化內容模組"],
        featured: true,
        button: "升級 Pro",
      },
      {
        name: "Studio",
        price: yearly ? "NT$3,990 / 月" : "NT$4,990 / 月",
        desc: "適合創作者、品牌與團隊正式上線與後續優化。",
        items: ["自訂品牌風格", "多頁擴充建議", "高轉換導購動線", "優先支援", "長期升級空間"],
        featured: false,
        button: "聯絡我們",
      },
    ];
  }, [billing]);

  const faqs = [
    {
      q: "這是網站還是 App？",
      a: "目前這版是正式可上線的網站首頁，手機與電腦都能直接打開。之後也可以再延伸做成真正的 Android 或 iPhone App。",
    },
    {
      q: "這個版本可以先開始用嗎？",
      a: "可以。先上線、先收名單、先測市場，是最省力也最實際的做法，之後再慢慢擴功能。",
    },
    {
      q: "Email 真的會收到嗎？",
      a: "如果你的 waitlist API 已經設定好，表單送出後會直接打到你的 API，這版已經預留好這個流程。",
    },
    {
      q: "之後還能再改風格嗎？",
      a: "可以。這份版型就是正式基底，之後可以再改成更極簡、蘋果感、黑金感，或更像手機 App 的介面。",
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

      setEmailMessage("已成功加入等候名單");
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(120,180,255,0.14),transparent_25%),radial-gradient(circle_at_85%_18%,rgba(255,255,255,0.08),transparent_16%),linear-gradient(180deg,#040714_0%,#060b1a_52%,#03060d_100%)]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-white/8" />
        <div className="absolute left-[18%] top-28 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute right-[12%] top-36 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-10">
          <header className="mb-12 flex items-center justify-between">
            <div className="text-sm font-semibold tracking-[0.28em] text-white/90">
              YOUR AI APP
            </div>

            <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
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
              className="rounded-full border border-white/10 bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
            >
              立即開始
            </a>
          </header>

          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center rounded-full border border-cyan-300/15 bg-cyan-300/8 px-4 py-2 text-[11px] font-medium tracking-[0.28em] text-cyan-100">
                AI SAAS LANDING PAGE
              </div>

              <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.03em] md:text-6xl">
                極簡霓虹感，
                <br />
                真正像 AI SaaS
                <br />
                官網的首頁。
              </h1>

              <p className="mt-7 max-w-xl text-[15px] leading-8 text-white/62 md:text-[17px]">
                幫你把想法整理成能上線的產品首頁，從品牌感、功能結構、CTA
                到名單收集一次做好。現在不只好看，而是可以直接拿去用。
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#waitlist"
                  className="rounded-full bg-white px-7 py-3.5 text-center text-sm font-semibold text-black transition hover:opacity-90"
                >
                  立即開始
                </a>
                <a
                  href="#features"
                  className="rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-center text-sm font-medium text-white transition hover:bg-white/[0.06]"
                >
                  查看功能
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/38">
                <span>黑銀科技感</span>
                <span>可收 Email 名單</span>
                <span>可直接部署</span>
                <span>Next.js 正式版</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[2.5rem] bg-cyan-300/8 blur-3xl" />
              <div className="relative mx-auto max-w-[560px] rounded-[2rem] border border-white/10 bg-white/[0.035] p-3 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0a1020]">
                  <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_18%,transparent_82%,rgba(255,255,255,0.03))]" />
                  <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.10),transparent_26%)]" />
                  <Image
                    src="/ai-hero.jpg"
                    alt="AI futuristic hero"
                    width={900}
                    height={1200}
                    priority
                    className="h-auto w-full object-cover"
                  />
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#07101c]/45 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 z-20 flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>
                  <div className="absolute bottom-4 right-4 z-20 rounded-full border border-cyan-200/20 bg-cyan-200/10 px-3 py-1 text-[11px] font-medium text-cyan-100 backdrop-blur">
                    Live Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              tag: "AI Workspace",
              title: "先把想法整理成產品架構",
              desc: "把需求、品牌感、功能區塊與首頁動線整理清楚，不再只是靈感，而是能上線的產品頁。",
            },
            {
              tag: "Hero System",
              title: "第一屏更有品牌感",
              desc: "更乾淨的視覺比例、清楚的核心賣點與 CTA，讓首頁看起來像真正的正式產品，而不是模板。",
            },
            {
              tag: "Waitlist API",
              title: "現在就能先收名單",
              desc: "先把流量接住，先開始累積 Email，再決定後面要不要做完整平台或原生 App。",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.025] p-6 backdrop-blur"
            >
              <div className="mb-4 inline-flex rounded-full border border-cyan-300/12 bg-cyan-300/8 px-3 py-1 text-[11px] text-cyan-100">
                {item.tag}
              </div>
              <h3 className="text-[22px] font-semibold leading-snug text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/58">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="workflow" className="mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="mb-10 max-w-2xl">
          <p className="text-[11px] tracking-[0.28em] text-cyan-100/75">
            WORKFLOW
          </p>
          <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">
            從概念到上線，
            <br />
            用更省力的方式完成。
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["01", "整理定位", "先把品牌調性、受眾與首頁主軸定清楚，少走很多冤枉路。"],
            ["02", "建立首頁", "把視覺、文案、功能區塊、價格與 CTA 組成一個像正式產品的首頁。"],
            ["03", "開始測市場", "先收名單、先看反應，再決定下一步是擴功能、做後台，還是做 App。"],
          ].map(([no, title, desc]) => (
            <div
              key={no}
              className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-6"
            >
              <div className="text-[11px] tracking-[0.26em] text-cyan-100/72">
                {no}
              </div>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/58">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="waitlist" className="mx-auto max-w-7xl px-6 py-6 md:px-10">
        <div className="overflow-hidden rounded-[2rem] border border-cyan-300/10 bg-[linear-gradient(135deg,rgba(8,16,33,0.98),rgba(6,9,18,0.98))] p-8 shadow-[0_25px_100px_rgba(0,0,0,0.45)] md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-[11px] tracking-[0.28em] text-cyan-100/75">
                READY TO LAUNCH
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
                現在開始，
                <br />
                把它做成真正可用的產品。
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-8 text-white/62">
                這裡不是假表單。你輸入 Email 後，會真的送到你的 Next.js API，
                先把市場接住，再慢慢把產品做完整。
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
            >
              <label className="mb-3 block text-sm text-white/70">
                輸入你的 Email
              </label>
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
            <p className="text-[11px] tracking-[0.28em] text-cyan-100/75">
              PRICING
            </p>
            <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
              可直接開始的價格方案
            </h2>
            <p className="mt-3 max-w-2xl text-white/58">
              先用最適合現在階段的版本開始，之後再升級，不必一開始做太重。
            </p>
          </div>

          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            <button
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                billing === "monthly" ? "bg-white text-black" : "text-white/62"
              }`}
            >
              月付
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                billing === "yearly" ? "bg-white text-black" : "text-white/62"
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
              className={`rounded-[1.75rem] border p-6 ${
                plan.featured
                  ? "border-cyan-200/20 bg-[linear-gradient(180deg,rgba(18,28,54,0.95),rgba(10,15,28,0.98))] shadow-[0_16px_60px_rgba(70,170,255,0.10)]"
                  : "border-white/10 bg-white/[0.025]"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">{plan.name}</h3>
                {plan.featured ? (
                  <span className="rounded-full border border-cyan-200/15 bg-cyan-200/8 px-3 py-1 text-[11px] text-cyan-100">
                    Most Popular
                  </span>
                ) : null}
              </div>

              <div className="mt-5 text-3xl font-semibold">{plan.price}</div>
              <p className="mt-3 text-sm leading-7 text-white/58">{plan.desc}</p>

              <ul className="mt-6 space-y-3 text-sm text-white/78">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full rounded-2xl px-5 py-3 text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-white text-black hover:opacity-90"
                    : "border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]"
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
          <p className="text-[11px] tracking-[0.28em] text-cyan-100/75">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">常見問題</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const opened = openFaq === index;
            return (
              <div
                key={faq.q}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.025] p-5"
              >
                <button
                  className="flex w-full items-center justify-between gap-6 text-left"
                  onClick={() => setOpenFaq(opened ? null : index)}
                >
                  <span className="text-base font-medium text-white">{faq.q}</span>
                  <span className="text-white/45">{opened ? "−" : "+"}</span>
                </button>
                {opened ? (
                  <p className="mt-4 max-w-4xl text-sm leading-7 text-white/60">
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
            <p className="mt-4 text-sm leading-7 text-white/42">
              幫你把想法變成能上線的首頁，先建立品牌感，再慢慢把產品做大。
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-white">產品</h3>
            <div className="mt-4 space-y-3 text-sm text-white/52">
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
            <div className="mt-4 space-y-3 text-sm text-white/52">
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
            <div className="mt-4 space-y-3 text-sm text-white/52">
              <a
                href="mailto:support@youraiapp.com"
                className="block hover:text-white"
              >
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