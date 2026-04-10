#!/usr/bin/env python3
"""Calculate a PERT estimate from three point estimates in hours."""

from __future__ import annotations

import argparse
import json
import sys
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP


FORMULA = "(O + 4M + P) / 6"


def parse_hours(label: str, raw_value: str) -> Decimal:
    normalized = raw_value.strip().replace(",", ".")
    try:
        value = Decimal(normalized)
    except InvalidOperation as exc:
        raise ValueError(f"{label} must be a numeric hour value.") from exc

    if value < 0:
        raise ValueError(f"{label} must be greater than or equal to zero.")

    return value


def decimal_to_text(value: Decimal) -> str:
    normalized = value.normalize()
    return format(normalized, "f")


def decimal_to_two_places(value: Decimal) -> str:
    return format(value.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP), "f")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Calculate a PERT estimate and convert it to hours and minutes."
    )
    parser.add_argument("--issue", help="Jira issue key or short label.", default=None)
    parser.add_argument("--optimistic", required=True, help="Optimistic estimate in hours.")
    parser.add_argument(
        "--most-likely",
        required=True,
        dest="most_likely",
        help="Most likely estimate in hours.",
    )
    parser.add_argument("--pessimistic", required=True, help="Pessimistic estimate in hours.")
    return parser


def main() -> int:
    try:
        parser = build_parser()
        args = parser.parse_args()

        optimistic = parse_hours("optimistic", args.optimistic)
        most_likely = parse_hours("most likely", args.most_likely)
        pessimistic = parse_hours("pessimistic", args.pessimistic)

        if optimistic > most_likely:
            raise ValueError("optimistic must be less than or equal to most likely.")
        if most_likely > pessimistic:
            raise ValueError("most likely must be less than or equal to pessimistic.")

        pert_hours = (optimistic + (most_likely * 4) + pessimistic) / Decimal("6")
        total_minutes = int(
            (pert_hours * Decimal("60")).quantize(Decimal("1"), rounding=ROUND_HALF_UP)
        )
        hours = total_minutes // 60
        minutes = total_minutes % 60

        result = {
            "issue": args.issue,
            "optimistic_hours": float(optimistic),
            "most_likely_hours": float(most_likely),
            "pessimistic_hours": float(pessimistic),
            "formula": FORMULA,
            "calculation": (
                f"({decimal_to_text(optimistic)} + 4 * {decimal_to_text(most_likely)} + "
                f"{decimal_to_text(pessimistic)}) / 6 = {decimal_to_two_places(pert_hours)} hours"
            ),
            "pert_hours": float(pert_hours),
            "pert_hours_display": decimal_to_two_places(pert_hours),
            "total_minutes": total_minutes,
            "formatted_duration": f"{hours}h {minutes:02d}min",
        }

        print(json.dumps(result, ensure_ascii=True, indent=2))
        return 0
    except ValueError as error:
        print(str(error), file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
