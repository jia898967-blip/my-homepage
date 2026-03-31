"use client";

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
        desc: "適合先體驗產品與建立基本流程。",
        items: ["基礎 AI 對話", "基本內容生成", "單人使用", "社群支援"],
        featured: false,
        button: "立即開始",
      },
      {
        name: "Pro",
        price: yearly ? "NT$790 / 月" : "NT$990 / 月",
        desc: yearly
          ? "年繳更划算，適合高頻使用者與創作者。"
          : "適合自由工作者、創作者與高頻使用者。",
        items: ["進階生成能力", "更長內容輸出", "頁面與文案工作流", "優先體驗新功能"],
        featured: true,
        button: yearly ? "年繳升級" : "升級 Pro",
      },
      {
        name: "Team",
        price: yearly ? "客製年約" : "客製方案",
        desc: "適合多人協作與內部流程整合。",
        items: ["多人協作", "角色權限", "流程整合", "專屬支援"],
        featured: false,
        button: "聯絡我們",
      },
    ];
  }, [billing]);

  const faqs = [
    {
      q: "這個版本現在可以直接使用嗎？",
      a: "可以。這是一個可直接貼進 Next.js 的前端首頁版本，包含導覽列、價格切換、FAQ 展開收合、Email 表單與 CTA 區塊，存檔就能立即看到效果。",
    },
    {
      q: "這已經是完整產品了嗎？",
      a: "目前是高完成度的前端展示版與官網首頁版。外觀與互動可以直接用，但真正的登入、付款、資料儲存，還需要再接後端服務。",
    },
    {
      q: "我不會寫程式也可以先用嗎？",
      a: "可以。你可以先把這版當成正式網站雛形，先確認風格與結構，再慢慢接上真正功能。",
    },
    {
      q: "之後可以再接 Stripe、登入、資料庫嗎？",
      a: "可以，這就是最適合往下延伸的起點。下一步可以接登入、訂閱付款、後台與 API。",
    },
  ];

  const features = [
    {
      title: "AI 內容生成",
      desc: "快速生成首頁文案、功能介紹、腳本與結構。",
    },
    {
      title: "需求整理",
      desc: "把零散想法整理成清楚、可執行的方向。",
    },
    {
      title: "高級產品感",
      desc: "深色霓虹介面，直接拉出 AI SaaS 官網氛圍。",
    },
    {
      title: "互動式區塊",
      desc: "價格切換、FAQ 展開、表單驗證都已經可用。",
    },
    {
      title: "快速延伸",
      desc: "後面可再接登入、付款、儀表板與資料庫。",
    },
    {
      title: "可直接改",
      desc: "全部都在一個 page.tsx，現在就能改成你的版本。",
    },
  ];

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMessage("");
    setEmailError("");

    const cleanEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

    if (!cleanEmail) {
      setEmailError("請先輸入 Email。");
      return;
    }

    if (!isValidEmail) {
      setEmailError("請輸入正確的 Email 格式。");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setEmailError(data.message || "送出失敗，請稍後再試。");
        return;
      }

      setEmailMessage(data.message || "已成功加入等候名單。");
      setEmail("");
    } catch {
      setEmailError("送出失敗，請檢查網路或稍後再試。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen scroll-smooth bg-[#060816] text-white">
      <div className="fixed inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(64,114,255,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(0,255,209,0.12),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(159,92,255,0.16),transparent_28%),linear-gradient(to_bottom,#060816,#0a1020_45%,#060816)]" />
      <div className="fixed inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060816]/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
          <a
            href="#top"
            className="text-sm font-semibold uppercase tracking-[0.24em] text-white"
          >
            Your AI App
          </a>

          <nav className="hidden items-center gap-8 text-sm text-white/65 md:flex">
            <a href="#features" className="transition hover:text-white">
              功能
            </a>
            <a href="#how" className="transition hover:text-white">
              使用方式
            </a>
            <a href="#pricing" className="transition hover:text-white">
              價格方案
            </a>
            <a href="#faq" className="transition hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#pricing"
              className="hidden rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-cyan-300/30 hover:bg-white/5 md:inline-flex"
            >
              查看方案
            </a>
            <a
              href="#cta"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
            >
              立即開始
            </a>
          </div>
        </div>
      </header>

      <section
        id="top"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28"
      >
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.22em] text-cyan-200">
              AI SaaS Landing Page
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
              極簡霓虹感，
              <br />
              真正像 AI SaaS 官網的首頁。
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/65 md:text-lg">
              幫你把想法整理成結構、把結構做成頁面，再把頁面延伸成真正可上線的產品。
              這版已經有完整官網感與前端互動，也能真的送出 Email。
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#cta"
                className="rounded-2xl bg-white px-6 py-3 text-center font-medium text-black transition hover:opacity-90"
              >
                立即開始
              </a>
              <a
                href="#features"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-center text-white transition hover:border-cyan-300/30 hover:bg-white/10"
              >
                查看功能
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/45">
              <span>霓虹科技感</span>
              <span>FAQ 互動</span>
              <span>價格切換</span>
              <span>Email 真送出</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[40px] bg-cyan-400/10 blur-3xl" />
            <div className="relative rounded-[32px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur md:p-6">
              <div className="rounded-[28px] border border-white/10 bg-[#0a1020]/90 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                    <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                  </div>
                  <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
                    Live Preview
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-cyan-300/10 bg-cyan-300/5 p-4">
                  <p className="text-sm font-medium text-cyan-100">AI Workspace</p>
                  <p className="mt-2 text-sm leading-7 text-white/65">
                    幫我生成一個高級、深色、極簡霓虹風格的 AI SaaS 首頁，並把 FAQ、價格切換、CTA、等待名單送出都做進去。
                  </p>
                </div>

                <div className="mt-4 grid gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-medium text-white">Hero 結構</p>
                    <p className="mt-2 text-sm text-white/55">
                      深色背景、霓虹光感、清楚 CTA
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-medium text-white">Pricing 切換</p>
                    <p className="mt-2 text-sm text-white/55">
                      月繳 / 年繳互動已可用
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm font-medium text-white">Waitlist API</p>
                    <p className="mt-2 text-sm text-white/55">
                      已可真的送出 Email
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-white/40">Style</p>
                    <p className="mt-2 text-lg font-semibold">Neon</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-white/40">State</p>
                    <p className="mt-2 text-lg font-semibold">Interactive</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-xs text-white/40">Email</p>
                    <p className="mt-2 text-lg font-semibold">Connected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
            Features
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            不只是好看，
            <br />
            是可以直接展示、直接往下做。
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7 shadow-[0_20px_70px_rgba(0,0,0,0.25)]"
            >
              <div className="mb-5 h-11 w-11 rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-300/20" />
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="how"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24"
      >
        <div className="grid gap-12 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              三步，
              <br />
              直接做成產品頁。
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/60">
              從需求整理、內容生成到頁面雛形，現在這版已經能直接展示你產品的樣子。
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                no: "01",
                title: "輸入需求",
                desc: "不用先整理完整，直接把你腦中的想法丟進來。",
              },
              {
                no: "02",
                title: "AI 生成結構與內容",
                desc: "自動拆解問題、整理重點、補齊文案與頁面方向。",
              },
              {
                no: "03",
                title: "直接延伸成產品",
                desc: "從 prototype 到正式網站，整體流程更快也更順。",
              },
            ].map((item) => (
              <div
                key={item.no}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="text-sm text-cyan-300/70">{item.no}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/60">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-24"
      >
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
              Pricing
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
              價格方案，
              <br />
              現在就能互動切換。
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60">
              這裡已經做了月繳 / 年繳切換，你可以直接拿來展示真實產品感。
            </p>
          </div>

          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                billing === "monthly"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              月繳
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-4 py-2 text-sm transition ${
                billing === "yearly"
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              年繳
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[30px] border p-7 shadow-[0_20px_70px_rgba(0,0,0,0.28)] ${
                plan.featured
                  ? "border-cyan-300/30 bg-[linear-gradient(180deg,rgba(20,34,66,0.95),rgba(8,12,24,0.98))]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <p
                className={`text-sm ${
                  plan.featured ? "text-cyan-200/80" : "text-white/45"
                }`}
              >
                {plan.name}
              </p>

              <h3 className="mt-4 text-3xl font-semibold text-white">
                {plan.price}
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/60">
                {plan.desc}
              </p>

              <div className="mt-8 space-y-3">
                {plan.items.map((item) => (
                  <div
                    key={item}
                    className={`rounded-xl px-3 py-2 text-sm text-white ${
                      plan.featured
                        ? "bg-white/10"
                        : "border border-white/8 bg-white/[0.03]"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </div>

              <button
                type="button"
                className={`mt-8 inline-flex rounded-2xl px-5 py-3 text-sm transition ${
                  plan.featured
                    ? "bg-white text-black hover:opacity-90"
                    : "border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.08]"
                }`}
              >
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
            FAQ
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            FAQ 也不是假的，
            <br />
            現在就能點開。
          </h2>
        </div>

        <div className="grid gap-4">
          {faqs.map((item, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="text-lg font-semibold text-white">
                    {item.q}
                  </span>
                  <span className="text-xl text-cyan-300">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm leading-7 text-white/60">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section id="cta" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="rounded-[36px] border border-cyan-300/15 bg-[linear-gradient(180deg,rgba(18,24,42,0.95),rgba(8,10,18,1))] px-8 py-14 shadow-[0_30px_90px_rgba(0,0,0,0.38)] md:px-14 md:py-18">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">
              Ready to launch
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              現在開始，
              <br />
              把它做成真正可用的產品。
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">
              這裡已經不是假表單了。你輸入 Email 後，會真的送到你的 Next.js API，再由 Resend 寄到你的信箱。
            </p>

            <form
              onSubmit={handleWaitlist}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="輸入你的 Email"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 text-white outline-none placeholder:text-white/30 focus:border-cyan-300/30"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-2xl bg-white px-6 py-3 font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "送出中..." : "加入等候名單"}
              </button>
            </form>

            {emailError ? (
              <p className="mt-4 text-sm text-red-300">{emailError}</p>
            ) : null}

            {emailMessage ? (
              <p className="mt-4 text-sm text-cyan-200">{emailMessage}</p>
            ) : null}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-4 md:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
              Your AI App
            </p>
            <p className="mt-4 text-sm leading-7 text-white/55">
              幫你把想法整理成結果，
              <br />
              再把結果延伸成真正產品。
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">產品</p>
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
            <p className="text-sm font-semibold text-white">資源</p>
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
            <p className="text-sm font-semibold text-white">聯絡</p>
            <div className="mt-4 space-y-3 text-sm text-white/55">
              <a href="#" className="block hover:text-white">
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

        <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-white/40 md:px-10">
          © 2026 Your AI App. All rights reserved.
        </div>
      </footer>
    </main>
  );
}