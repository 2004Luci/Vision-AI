from __future__ import annotations

import random


class InferenceService:
    def describe(self, image_bytes: bytes) -> tuple[str, float]:
        if not image_bytes:
            return "Empty image input.", 0.0

        descriptions = [
            "A scene captured by the camera.",
            "An indoor environment with objects in view.",
            "An outdoor scene with multiple elements.",
        ]
        description = random.choice(descriptions)
        confidence = 0.62
        return description, confidence

    def detect(self, image_bytes: bytes) -> list[dict]:
        if not image_bytes:
            return []
        return []