"""
TalentOS Brand Asset Generator
=============================
Generates SVG assets for different distribution channels programmatically.
Ensures brand consistency across all dimensions.

Usage:
    python scripts/generate_brand_assets.py
"""

import os
import math

# --- Configuration ---
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "docs", "assets")
BRAND_COLORS = {
    "bg_start": "#020617",
    "bg_mid": "#0f172a",
    "bg_end": "#1e1b4b",
    "accent_cyan": "#22d3ee",
    "accent_indigo": "#818cf8",
    "accent_purple": "#c084fc",
    "text_main": "#ffffff",
    "text_sub": "#94a3b8"
}

def create_defs():
    """Returns SVG definitions for gradients and patterns."""
    return f"""
    <defs>
        <!-- Background Gradient -->
        <linearGradient id="bg_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="{BRAND_COLORS['bg_start']}" />
            <stop offset="50%" stop-color="{BRAND_COLORS['bg_mid']}" />
            <stop offset="100%" stop-color="{BRAND_COLORS['bg_end']}" />
        </linearGradient>

        <!-- Brand Gradient -->
        <linearGradient id="brand_grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="{BRAND_COLORS['accent_cyan']}" />
            <stop offset="50%" stop-color="{BRAND_COLORS['accent_indigo']}" />
            <stop offset="100%" stop-color="{BRAND_COLORS['accent_purple']}" />
        </linearGradient>

        <!-- Grid Pattern -->
        <pattern id="grid_pat" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
            <circle cx="0" cy="0" r="1" fill="rgba(255,255,255,0.05)"/>
        </pattern>
        
        <!-- Glow Filter -->
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
    </defs>
    """

def create_scanner_element(cx, cy, scale=1.0):
    """Generates the radar/scanner graphic element."""
    return f"""
    <g transform="translate({cx}, {cy}) scale({scale})">
        <!-- Outer Rings -->
        <circle r="120" fill="none" stroke="url(#brand_grad)" stroke-width="1" stroke-dasharray="20 10" opacity="0.3">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite" />
        </circle>
        <circle r="80" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="4 4" opacity="0.2">
             <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="15s" repeatCount="indefinite" />
        </circle>
        
        <!-- Core -->
        <circle r="160" fill="none" stroke="url(#brand_grad)" stroke-width="30" stroke-opacity="0.03" />
        <circle r="10" fill="{BRAND_COLORS['accent_cyan']}">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        
        <!-- Scan Line -->
        <rect x="-120" y="-1" width="120" height="2" fill="url(#brand_grad)" opacity="0.8">
             <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" />
        </rect>
    </g>
    """

def generate_svg(filename, width, height, layout_type):
    """
    Generates an SVG file based on dimensions and layout type.
    Layouts: 'vertical', 'landscape', 'square'
    """
    
    # 1. Background
    bg_layer = f"""
    <rect width="{width}" height="{height}" fill="url(#bg_grad)" />
    <rect width="{width}" height="{height}" fill="url(#grid_pat)" />
    """
    
    content = ""
    
    # 2. Layout Logic
    if layout_type == "vertical": # e.g., 330x600
        # Mobile/Sidebar: Stacked
        scanner = create_scanner_element(width/2, height*0.3, scale=0.8)
        text_y = height * 0.65
        content = f"""
        {scanner}
        <g transform="translate({width/2}, {text_y})" text-anchor="middle">
            <text font-family="'JetBrains Mono', sans-serif" font-weight="800" font-size="42" fill="#fff" letter-spacing="-1">Talent</text>
            <text y="45" font-family="'JetBrains Mono', sans-serif" font-weight="800" font-size="42" fill="url(#brand_grad)" letter-spacing="-1">OS</text>
            <rect x="-20" y="65" width="40" height="4" fill="url(#brand_grad)" />
            <text y="95" font-family="sans-serif" font-size="12" fill="{BRAND_COLORS['text_sub']}" letter-spacing="3" text-transform="uppercase">Career OS</text>
        </g>
        """
        
    elif layout_type == "square": # e.g., 512x512
        # Icon/Avatar: Centralized, minimal text
        scanner = create_scanner_element(width/2, height/2, scale=1.2)
        content = f"""
        {scanner}
        <g transform="translate({width/2}, {height/2 + 10})" text-anchor="middle">
             <!-- Big T Logo -->
            <text font-family="'JetBrains Mono', sans-serif" font-weight="800" font-size="180" fill="#fff" filter="url(#glow)" opacity="0.9">T</text>
        </g>
        """
        
    else: # Landscape (Standard) e.g. 1200x660
        # Full Layout
        scanner = create_scanner_element(width*0.75, height/2, scale=1.5)
        text_x = width * 0.1
        text_y = height * 0.55
        font_size = height * 0.12
        
        content = f"""
        {scanner}
        <g transform="translate({text_x}, {text_y})">
            <text font-family="'JetBrains Mono', sans-serif" font-weight="800" font-size="{font_size}" fill="#fff" letter-spacing="-2">
                Talent<tspan fill="url(#brand_grad)">OS</tspan>
            </text>
            <text x="5" y="{font_size * 0.4}" font-family="sans-serif" font-size="{font_size * 0.25}" fill="{BRAND_COLORS['text_sub']}" letter-spacing="4" text-transform="uppercase">
                The Career Operating System
            </text>
            <!-- Decorative Line -->
            <path d="M 5 {font_size * 0.6} L 200 {font_size * 0.6}" stroke="url(#brand_grad)" stroke-width="4" />
        </g>
        """

    # 3. Assemble SVG
    svg_content = f"""<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Generated by scripts/generate_brand_assets.py -->
    {create_defs()}
    {bg_layer}
    {content}
    </svg>"""
    
    # 4. Write File
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"Generated: {filepath}")

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    print("Generating TalentOS Brand Assets...")
    
    # 1. Vertical (Mobile/Sidebar)
    generate_svg("cover_mobile_330x600.svg", 330, 600, "vertical")
    
    # 2. Landscape (Social/Blog)
    generate_svg("cover_social_1200x660.svg", 1200, 660, "landscape")
    
    # 3. Square (Icon/Avatar)
    generate_svg("logo_square_512x512.svg", 512, 512, "square")
    
    print("Done.")

if __name__ == "__main__":
    main()