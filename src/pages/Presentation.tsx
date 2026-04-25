import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const slides = [
  {
    id: 1,
    type: "title",
    title: "Жизнь на Марсе",
    subtitle: "Будущее человечества на Красной планете",
    note: "Образовательный проект · 2026",
  },
  {
    id: 2,
    type: "content",
    label: "Введение",
    title: "Почему Марс?",
    points: [
      "Ближайшая потенциально обитаемая планета",
      "День на Марсе длится 24 часа 37 минут — почти как на Земле",
      "Есть вода в виде льда на полюсах",
      "Возможность терраформирования атмосферы",
    ],
  },
  {
    id: 3,
    type: "stat",
    label: "Факты",
    stats: [
      { value: "225M", label: "км до Земли (среднее)" },
      { value: "−63°C", label: "средняя температура" },
      { value: "38%", label: "гравитация от земной" },
      { value: "687", label: "дней в марсианском году" },
    ],
  },
  {
    id: 4,
    type: "content",
    label: "История исследований",
    title: "От зондов к людям",
    points: [
      "1965 — первый пролёт аппарата Mariner 4",
      "1997 — ровер Sojourner впервые едет по поверхности",
      "2012 — Curiosity начинает детальное изучение грунта",
      "2021 — вертолёт Ingenuity совершает первый полёт",
      "2030-е — первые пилотируемые миссии (план NASA и SpaceX)",
    ],
  },
  {
    id: 5,
    type: "content",
    label: "Атмосфера",
    title: "Чем дышат марсиане?",
    points: [
      "95% углекислого газа, 3% азота, 2% аргона",
      "Давление в 100 раз ниже земного",
      "MOXIE (Mars Oxygen ISRU Experiment) уже производит O₂ на Марсе",
      "Будущее: кислородные купола и генераторы",
    ],
  },
  {
    id: 6,
    type: "content",
    label: "Жильё",
    title: "Где жить на Марсе?",
    points: [
      "Герметичные купола из полимерных материалов",
      "Подземные базы для защиты от радиации",
      "3D-печать жилья из марсианского грунта (реголита)",
      "Модульные станции, соединённые переходами",
    ],
  },
  {
    id: 7,
    type: "content",
    label: "Питание",
    title: "Что едят на Марсе?",
    points: [
      "Гидропонные и аэропонные фермы внутри куполов",
      "Выращивание картофеля, сои, пшеницы в замкнутом цикле",
      "Производство мяса из клеток (культивированное мясо)",
      "Запасы и доставка с Земли на первых этапах",
    ],
  },
  {
    id: 8,
    type: "content",
    label: "Энергия",
    title: "Источники энергии",
    points: [
      "Солнечные панели (солнце слабее в 2 раза, чем на Земле)",
      "Компактные ядерные реакторы — проект Kilopower (NASA)",
      "Ветрогенераторы при сильных марсианских бурях",
      "Накопители энергии для ночного времени",
    ],
  },
  {
    id: 9,
    type: "content",
    label: "Здоровье",
    title: "Медицина и выживание",
    points: [
      "Радиация в 40 раз выше, чем на поверхности Земли",
      "Защита: толстые стены, магнитные экраны, подземные убежища",
      "Малая гравитация ослабляет мышцы и кости — нужны тренировки",
      "Телемедицина и автономные медицинские системы",
    ],
  },
  {
    id: 10,
    type: "content",
    label: "Связь",
    title: "Интернет на Марсе",
    points: [
      "Задержка сигнала от 3 до 22 минут в одну сторону",
      "Невозможны звонки в реальном времени с Землёй",
      "Локальная марсианская сеть для жителей колонии",
      "Спутниковые ретрансляторы на орбите Марса",
    ],
  },
  {
    id: 11,
    type: "content",
    label: "Терраформирование",
    title: "Изменить планету",
    points: [
      "Цель: сделать атмосферу пригодной для жизни за 100–1000 лет",
      "Выброс парниковых газов для разогрева планеты",
      "Зеркала на орбите для концентрации солнечного тепла",
      "Введение микроорганизмов для производства кислорода",
    ],
  },
  {
    id: 12,
    type: "content",
    label: "Общество",
    title: "Как устроена колония?",
    points: [
      "Первые колонисты — учёные, инженеры, медики",
      "Новые законы и управление: нет государств, есть устав колонии",
      "Психологические вызовы: изоляция, замкнутое пространство",
      "Формирование новой культуры и идентичности",
    ],
  },
  {
    id: 13,
    type: "content",
    label: "Стартапы",
    title: "Кто строит марсианское будущее?",
    points: [
      "SpaceX — Starship для доставки грузов и людей",
      "NASA — программа Artemis и Mars Sample Return",
      "Blue Origin — инфраструктура космического транспорта",
      "Сотни стартапов: еда, медицина, связь, строительство",
    ],
  },
  {
    id: 14,
    type: "content",
    label: "Вызовы",
    title: "Главные препятствия",
    points: [
      "Стоимость: ~$10 млрд на первую пилотируемую миссию",
      "Психологическая нагрузка при перелёте 6–9 месяцев",
      "Этика: право на Марс, экология планеты",
      "Техническая надёжность всех систем жизнеобеспечения",
    ],
  },
  {
    id: 15,
    type: "final",
    title: "Марс — следующий шаг",
    subtitle: "Человечество всегда двигалось вперёд. Марс — не вопрос «если», а вопрос «когда».",
    note: "Mars Future · Образовательный проект о колонизации Марса",
  },
];

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = useCallback(() => {
    setCurrent((c) => Math.min(c + 1, slides.length - 1));
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") next();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
      if (e.key === "Escape") navigate("/");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, navigate]);

  const slide = slides[current];
  const progress = ((current + 1) / slides.length) * 100;

  return (
    <div className="fixed inset-0 bg-neutral-950 text-white flex flex-col select-none overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-800 z-20">
        <div
          className="h-full bg-orange-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wide"
        >
          <Icon name="ArrowLeft" size={16} />
          На сайт
        </button>
        <span className="text-neutral-500 text-sm">
          {current + 1} / {slides.length}
        </span>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center px-8 md:px-16 lg:px-24">
        {slide.type === "title" && (
          <div className="text-center max-w-4xl">
            <p className="text-orange-500 uppercase tracking-widest text-sm mb-6">{slide.note}</p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400">{slide.subtitle}</p>
          </div>
        )}

        {slide.type === "content" && (
          <div className="max-w-4xl w-full">
            <p className="text-orange-500 uppercase tracking-widest text-sm mb-4">{slide.label}</p>
            <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">{slide.title}</h2>
            <ul className="space-y-4">
              {slide.points?.map((point, i) => (
                <li key={i} className="flex items-start gap-4 text-lg md:text-xl text-neutral-300">
                  <span className="text-orange-500 mt-1 shrink-0">—</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        {slide.type === "stat" && (
          <div className="max-w-4xl w-full">
            <p className="text-orange-500 uppercase tracking-widest text-sm mb-10 text-center">{slide.label}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {slide.stats?.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 mb-3">{s.value}</div>
                  <div className="text-neutral-400 text-sm md:text-base">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {slide.type === "final" && (
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl text-neutral-400 mb-8">{slide.subtitle}</p>
            <p className="text-orange-500 uppercase tracking-widest text-sm">{slide.note}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-4 z-10">
        <button
          onClick={prev}
          disabled={current === 0}
          className="p-3 rounded-full border border-neutral-700 hover:border-neutral-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-orange-500 w-6" : "bg-neutral-600 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === slides.length - 1}
          className="p-3 rounded-full border border-neutral-700 hover:border-neutral-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <Icon name="ChevronRight" size={20} />
        </button>
      </div>
    </div>
  );
}
