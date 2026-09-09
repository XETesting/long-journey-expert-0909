# Aeneid Trail — Core Game State Definition

**Locked in Phase 1 — Foundation**  
**Expanded in Phase 2 — Narrative Skeleton**  
Last updated: 2026-07-21

All game logic operates on a single serializable `GameState` object.  
Content (events, choices, text) is data-driven and separate from the state engine.

---

## Primary Resources (Oregon Trail DNA)

| Key          | Type    | Description                                      | Notes |
|--------------|---------|--------------------------------------------------|-------|
| `men`        | number  | Surviving Trojan warriors and able-bodied men    | Can die in events, disease, battle, storms |
| `ships`      | number  | Seaworthy vessels                                | Lost to storms, fire, grounding |
| `supplies`   | number  | Food, water, general provisions (units)          | Drain per travel leg + events |
| `morale`     | number  | Collective will / hope (0–100)                   | Affects event outcomes, desertion risk |

## Secondary Stats

| Key              | Type    | Description                                      |
|------------------|---------|--------------------------------------------------|
| `piety`          | number  | Favor with the gods / sense of duty (0–100)      | Influences divine events, omens |
| `junoHostility`  | number  | Juno’s ongoing anger (starts high)               | Increases storm / misfortune chance |
| `venusFavor`     | number  | Support from Venus (Aeneas’ mother)              | Can mitigate disasters |
| `health`         | number  | Aeneas’ personal condition (0–100)               | Rarely critical until late |

## Party Members

Named companions tracked individually. Death is permanent and should feel significant.

```ts
interface Companion {
  id: string;
  name: string;
  status: "alive" | "dead" | "missing";
  role: string;
}
```

**Core party (early game):**
- Anchises (father) — dies in Sicily (Chapter 3)
- Ascanius / Iulus (son)
- Creusa (wife) — lost in Troy
- Achates (loyal lieutenant)

Later companions may be added or noted via flags (Pallas, etc.).

## Flags (Long-term state) — Phase 2

```js
flags: {
  // Chapter 1–2
  escapedTroy: boolean,
  creusaLost: boolean,
  householdGodsSecured: boolean,
  fleetAssembled: boolean,
  firstVoyageComplete: boolean,
  polydorusFound: boolean,

  // Chapter 3
  delosVisited: boolean,
  creteAttempted: boolean,
  harpiesCursed: boolean,      // Celaeno’s prophecy
  buthrotumVisited: boolean,
  anchisesDead: boolean,

  // Chapter 4–5
  didoMet: boolean,
  didoAffair: boolean,         // how deeply the relationship went
  leftDido: boolean,
  didoCursed: boolean,         // her dying curse on Aeneas / Romans

  // Chapter 6–7
  underworldVisited: boolean,
  sawFutureRome: boolean,

  // Chapter 8–9
  evanderAllied: boolean,
  pallasDead: boolean,

  // Chapter 10
  turnusSpared: boolean,
  turnusKilled: boolean
}
```

## Travel Progress

```ts
interface TravelState {
  currentChapter: number;       // 1–10
  currentLeg: string;           // e.g. "troy-escape", "sea-to-thrace", "carthage-stay"
  daysElapsed: number;
}
```

## Full GameState Shape

```ts
interface GameState {
  version: string;
  startedAt: string;
  lastSavedAt: string;

  men: number;
  ships: number;
  supplies: number;
  morale: number;

  piety: number;
  junoHostility: number;
  venusFavor: number;
  health: number;

  companions: Companion[];
  flags: Record<string, boolean | string | number>;
  travel: TravelState;
  eventLog: string[];
}
```

## Design Rules for State Changes (Phase 2)

1. Every choice produces at least one visible change (resource, companion, flag, or morale).
2. Death of named companions is irreversible and triggers a narrative beat.
3. Supplies drain on every successful travel leg (base rate + modifiers).
4. Morale below ~25 risks negative events or desertion flavor.
5. `junoHostility` and `venusFavor` weight random event severity.
6. Key flags (especially `didoCursed`, `turnusSpared` / `turnusKilled`, `anchisesDead`) surface in later text and endings.

This definition is the single source of truth for Phase 2 implementation.
