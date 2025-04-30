export interface GameState {
    playerNames: string[];
    selectedCategories: Set<string>;
    impostorCount: number;
    useRandomImpostors: boolean;
    showPlayerNameDialog: boolean;
    gameStarted: boolean;
    currentPlayerIndex: number;
    roleRevealed: boolean;
    allPlayersRevealed: boolean;
    impostors: string[];
    word: string;
    selectedStartingPlayer: string;
    revealedPlayers: Set<string>;
}

export const categories = ["Anime", "Character", "Abilities/Items"];

export const categoryWords = {
    "Anime": [
        "Naruto", "One Piece", "Dragon Ball", "Pokémon", "My Hero Academia",
        "Demon Slayer", "Attack on Titan", "Sword Art Online", "Death Note",
        "Fairy Tail", "Tokyo Revengers", "One Punch Man", "Bleach",
        "Black Clover", "Haikyuu!!", "Spy x Family", "The Seven Deadly Sins",
        "Jujutsu Kaisen", "Fullmetal Alchemist: Brotherhood",
        "Boruto: Naruto Next Generations"
    ],
    "Character": [
        "Naruto Uzumaki", "Son Goku", "Monkey D. Luffy", "Ash Ketchum",
        "Izuku Midoriya", "Tanjiro Kamado", "Eren Yeager", "Kirito",
        "Light Yagami", "Natsu Dragneel", "Takemichi Hanagaki", "Saitama",
        "Ichigo Kurosaki", "Asta", "Shoyo Hinata", "Loid Forger",
        "Meliodas", "Yuji Itadori", "Edward Elric", "Boruto Uzumaki"
    ],
    "Abilities/Items": [
        "Rasengan", "Kamehameha", "Gum-Gum Fruit", "Pokéball", "One For All",
        "Water Breathing", "ODM Gear", "Dual Wielding", "Death Note",
        "Dragon Slayer Magic", "Time Leaping", "One Punch", "Zangetsu",
        "Anti-Magic Sword", "Quick Attack", "Spy Gadgets", "Full Counter",
        "Cursed Energy", "Alchemy", "Scientific Ninja Tools"
    ]
};