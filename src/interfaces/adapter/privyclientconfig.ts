import { ReactElement } from "react"
import { CountryCode } from "libphonenumber-js/min"

type HexColor = `#${string}`
type WalletListEntry =
  | "metamask"
  | "coinbase_wallet"
  | "rainbow"
  | "phantom"
  | "zerion"
  | "cryptocom"
  | "uniswap"
  | "okx_wallet"
  | "detected_wallets"
  | "wallet_connect"
  | "rabby_wallet"
  | "safe"
type NonEmptyArray<T> = [T, ...T[]]
type LoginMethodOrderOption =
  | "email"
  | "sms"
  | WalletListEntry
  | OAuthProviderType
  | "farcaster"
  | "telegram"
declare const SUPPORTED_OAUTH_PROVIDERS: readonly [
  "google",
  "discord",
  "twitter",
  "github",
  "spotify",
  "instagram",
  "tiktok",
  "linkedin",
  "apple"
]
type OAuthProviderType = (typeof SUPPORTED_OAUTH_PROVIDERS)[number]
declare const EMBEDDED_WALLET_CLIENT_TYPES: readonly ["privy"]
type EmbeddedWalletClientType = (typeof EMBEDDED_WALLET_CLIENT_TYPES)[number]
declare const INJECTED_WALLET_CLIENT_TYPES: readonly [
  "metamask",
  "phantom",
  "brave_wallet",
  "rainbow",
  "uniswap_wallet_extension",
  "uniswap_extension",
  "rabby_wallet",
  "crypto.com_wallet_extension"
]
type InjectedWalletClientType = (typeof INJECTED_WALLET_CLIENT_TYPES)[number]
declare const COINBASE_WALLET_CLIENT_TYPES: readonly [
  "coinbase_wallet",
  "coinbase_smart_wallet"
]
type CoinbaseWalletClientType = (typeof COINBASE_WALLET_CLIENT_TYPES)[number]
type WalletConnectWalletClientType = any
declare const UNKNOWN_WALLET_CLIENT_TYPES: readonly ["unknown"]
type UnknownWalletClientType = (typeof UNKNOWN_WALLET_CLIENT_TYPES)[number]
type WalletClientType =
  | InjectedWalletClientType
  | CoinbaseWalletClientType
  | WalletConnectWalletClientType
  | EmbeddedWalletClientType
  | UnknownWalletClientType

/**
 * RPC configuration for wallets.
 */
type RpcConfig = {
  /**
   * Mapping of chainId to RPC URL. Overrides Privy default RPC URLs that are shared across projects. Set your own RPC URLs
   * to avoid rate limits or other throughput bottlenecks.
   *
   * Do not provide an RPC URL that can serve multiple networks. You should only provide RPC URLs that are speciifc to the
   * chain ID you'd like to override.
   */
  rpcUrls?: {
    [key: number]: string
  }
  /**
   * Mapping between `walletClientType`s to the length of time after which RPC requests will timeout for that
   * `walletClientType`.
   *
   * By default, all RPC requests through Privy will timeout after 2 mins (120000 ms). Use this object to
   * override the RPC timeout in ms for specific` walletClientType`s, e.g. 'safe', in order to extend or
   * shorten the timeout duration.
   */
  rpcTimeouts?: {
    [key in WalletClientType]?: number
  }
}

type RpcUrls = {
  http: readonly string[]
  webSocket?: readonly string[]
}
type NativeCurrency = {
  name: string
  /** 2-6 characters long */
  symbol: string
  decimals: number
}
type BlockExplorer = {
  name: string
  url: string
}

type Chain = {
  /** Id in number form */
  id: number
  /** Human readable name */
  name: string
  /** Internal network name */
  network?: string
  /** Currency used by chain */
  nativeCurrency: NativeCurrency
  /** Collection of block explorers */
  blockExplorers?: {
    [key: string]: BlockExplorer
    default: BlockExplorer
  }
  /** Collection of RPC endpoints */
  rpcUrls:
    | {
        [key: string]: RpcUrls
        default: RpcUrls
      }
    | {
        [key: string]: RpcUrls
        default: RpcUrls
        /** @optional Allows you to override the RPC url for this chain */
        privyWalletOverride: RpcUrls
      }
  /** Flag for test networks */
  testnet?: boolean
}

type ExternalWalletsConfig = {
  /**
   * Options to configure connections to the Coinbase Wallet (browser extension wallet, mobile wallet, and
   * passkey-based smart wallet).
   *
   * @experimental This is an experimental config designed to give Privy developers a way to test the Coinbase Smart Wallet
   * ahead of its mainnet launch. The smart wallet currently only supports the Base Sepolia testnet. In kind, DO NOT use this
   * configuration in production as it will prevent users from using the Coinbase Wallet on networks other than Base Sepolia.
   */
  coinbaseWallet?: {
    /**
     * Whether Coinbase wallet connections should prompt the smart wallet, the extension wallet, or intelligently decide between the two.
     * - If 'eoaOnly', Coinbase wallet connections will only prompt the Coinbase wallet browser extension or mobile app (an externally-owned account)
     * - If 'smartWalletOnly', Coinbase wallet connections will only prompt the Coinbase smart wallet and will not allow users to use the extension or mobile app.
     *   DO NOT use this setting in production.
     * - If 'all', Coinbase wallet connections will prompt the Coinbase wallet browser extension if it is detected as installed, and will otherwise prompt the smart wallet.
     */
    connectionOptions: "all" | "eoaOnly" | "smartWalletOnly"
  }
  /**
   * Options to configure WalletConnect behavior.
   *
   * @experimental This may change in future releases
   */
  walletConnect?: {
    /**
     * If disabled, stops WalletConnect from being initialized by the Privy SDK.
     *
     * WARNING: If you allow WalletConnect or WalletConnect-powered wallets, this will cause issues.
     *
     * Note that even if disabled, WalletConnect code may still be loaded in the browser. Defaults to true.
     *
     * @experimental This feature is very experimental and may break your wallet connector experience if you use external wallets.
     */
    enabled: boolean
  }
}

/**
 * Accepted payment methods for the MoonPay fiat on-ramp.
 */
type MoonpayPaymentMethod =
  | "ach_bank_transfer"
  | "credit_debit_card"
  | "gbp_bank_transfer"
  | "gbp_open_banking_payment"
  | "mobile_wallet"
  | "sepa_bank_transfer"
  | "sepa_open_banking_payment"
  | "pix_instant_payment"
  | "yellow_card_bank_transfer"
type MoonpayUiConfig = {
  accentColor?: string
  theme?: "light" | "dark"
}

type EmbeddedWalletCreateOnLoginConfig =
  | "users-without-wallets"
  | "all-users"
  | "off"

type PriceDisplayOptions =
  | {
      primary: "fiat-currency"
      secondary: "native-token"
    }
  | {
      primary: "native-token"
      secondary: null
    }

export interface PrivyClientConfig {
  /** All UI and theme related configuration */
  appearance?: {
    /** Primary theme for the privy UI. This dictates the foreground and background colors within the UI.
     *
     *  'light' (default): The privy default light UI.
     *  'dark': The privy default dark UI.
     *  custom hex code (i.e. '#13152F'): A custom background. This will generate the remainder of the foreground and
     *  background colors for the UI by modulating the luminance of the passed color. This value should be _either_ dark
     *  or light (<20% or >80% luminance), for accessibility. */
    theme?: "light" | "dark" | HexColor
    /** Accent color for the privy UI.
     *  Used for buttons, active borders, etc. This will generate light and dark variants.
     *  This overrides the server setting `accent_color`. */
    accentColor?: HexColor
    /** Logo for the main privy modal screen.
     *  This can be a string (url) or an img / svg react element.
     *  If passing an element, Privy will overwrite the `style` props, to ensure proper rendering.
     *  This overrides the server setting `logo_url` */
    logo?: string | ReactElement
    /**
     * Header text for the landing screen of the Privy login modal. We strongly recommend using a string
     *  of length 35 or less. Strings longer than the width of the login modal will be ellipsified.
     *
     * Defaults to 'Log in or sign up'.
     */
    landingHeader?: string
    /**
     * Subtitle text for the landing screen of the Privy login modal.
     *
     * This text will renders below the logo and will be capped at 100 characters.
     *
     * Defaults to undefined.
     */
    loginMessage?: string
    /** Determines the order of the login options in the privy modal. If true, the wallet login will render above
     *  social and email / sms login options.
     *  This overrides the server setting `show_wallet_login_first` */
    showWalletLoginFirst?: boolean
    /**
     * An array of {@link WalletListEntry wallet names} to configure the wallet buttons shown within
     * the `login`, `connectWallet`, and `linkWallet` modals. Privy will show buttons for each option
     * present in the list, in the order in which they are configured.
     *
     * On 'detected_wallets':
     * - This option serves as a fallback to include all wallets that detected by Privy, that might not be
     *   individually configured in the `walletList`. Browser extension wallets that are not explicitly configured
     *   in the `walletList` will fall into this category.
     * - If Privy detects a wallet, _and_ that wallet is configured within the `walletList` (e.g. 'metamask'),
     *   the order of the wallet's explicit name (e.g. 'metamask') in the `walletList` will take priority
     *   over the order of 'detected_wallets'.
     *
     * Defaults to ['detected_wallets', 'metamask', 'coinbase', 'rainbow', 'wallet_connect']
     *
     * @default ['detected_wallets', 'metamask', 'coinbase', 'rainbow', 'wallet_connect']
     */
    walletList?: WalletListEntry[]
  }
  /**
   * Login methods for the privy modal.
   *
   * This parameter enables you to display a subset of the login methods specified in the developer dashboard. `loginMethods` cannot be an empty array if specified. The order of this array does not  dictate order of the login methods in the UI.
   *
   * Note that any login method included in this parameter must also be enabled as a login method in the developer dashboard.
   *
   * If both `loginMethodsAndOrder` and `loginMethods` are defined, `loginMethodsAndOrder` will take precedence.
   */
  loginMethods?: Array<
    | "wallet"
    | "email"
    | "sms"
    | "google"
    | "twitter"
    | "discord"
    | "github"
    | "linkedin"
    | "spotify"
    | "instagram"
    | "tiktok"
    | "apple"
    | "farcaster"
    | "telegram"
  >
  /**
   * Login methods for the Privy modal. _This will override carefully designed defaults and should be used with caution._
   *
   * This parameter enables you to display a subset of the login methods specified in the developer dashboard. Login methods will be rendered in the order they appear in the array. The first 4 options specified in the `primary` list will render on the default screen of the login experience. Options in the `overflow` list will appear on the following screen.
   *
   * Note that any login method included in this parameter must also be enabled as a login method in the developer dashboard.
   *
   * If both `loginMethodsAndOrder` and `loginMethods` are defined, `loginMethodsAndOrder` will take precedence.
   */
  loginMethodsAndOrder?: {
    primary: NonEmptyArray<LoginMethodOrderOption>
    overflow?: Array<LoginMethodOrderOption>
  }
  /** Options for internationalization of the privy modal */
  intl?: {
    /**
     * This property is used to configure formatting and validation for the phone number input
     * used when `phone` is enabled as a login method. Must be a valid
     * [two-leter ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) (e.g. 'US').
     * Defaults to 'US'.
     *
     * @default 'US'
     */
    defaultCountry: CountryCode
  }
  /**
   * This property is only required for apps that use a third-party authentication provider.
   */
  customAuth?: {
    /**
     * If true, enable custom authentication integration.
     * This enables a JWT from a custom auth provider to be used to authenticate Privy embedded wallets.
     * Defaults to true.
     *
     * @default true
     */
    enabled?: boolean
    /**
     * A callback that returns the user's custom auth provider's access token as a string.
     * Can be left blank if using cookies to store and send access tokens
     *
     * @example
     * const {getAccessTokenSilently} = useAuth();
     *
     * <PrivyProvider
     *   {...props}
     *   config={{
     *     customAuth: {
     *       getCustomAccessToken: getAccessTokenSilently
     *     },
     *   }}
     * />
     */
    getCustomAccessToken: () => Promise<string | undefined>
    /**
     * Custom auth providers loading state
     *
     * @example
     * const {isLoading} = useAuth();
     *
     * <PrivyProvider
     *   {...props}
     *   config={{
     *     customAuth: {
     *       isLoading,
     *     },
     *   }}
     * />
     */
    isLoading: boolean
  }
  /** All legal configuration */
  legal?: {
    /** URL to the terms and conditions page for your application.
     *  Rendered as a link in the privy modal footer.
     *  This overrides the server setting `terms_and_conditions_url` */
    termsAndConditionsUrl?: string | null
    /** URL to the privacy policy page for your application.
     *  Rendered as a link in the privy modal footer.
     *  This overrides the server setting `privacy_policy_url` */
    privacyPolicyUrl?: string | null
  }
  walletConnectCloudProjectId?: string
  /**
   * @deprecated use `supportedChains[number].rpcUrls.privyWalletOverride` instead.
   *
   * RPC overrides to customize RPC URLs and timeout durations.
   */
  rpcConfig?: RpcConfig
  /**
   * @deprecated use `supportedChains` instead.
   *
   */
  additionalChains?: Chain[]
  /**
   * A list of supported chains, used to specify which chains should be used throughout the application.
   *
   * Calling `sendTransaction` or `switchChain` on an unsupported network will throw an error.
   *
   * For external wallets, if the wallet's current chain post-connection (during connect-only or siwe flows)
   * is not within the supported chains list, the user will be prompted to switch to the `defaultChain` (if set) or first supplied. If the chain
   * switching process does not fully succeed, the user will **not** be blocked from the application (and the wallet's current `chainId` can always
   * be observed and acted upon accordingly).
   *
   * For embedded wallets, the wallet will automatically default to the `defaultChain` (if set) or first supplied `supportedChain`.
   */
  supportedChains?: Chain[]
  /**
   * When supplied, the `defaultChain` will be the default chain used throughout the application.
   *
   * For external wallets, it will be used if the user's wallet it not within the `supportedChains` (or default chains) list.
   *
   * For embedded wallets, it will be used upon initialization, when the user hasn't switched to another supported chain.
   */
  defaultChain?: Chain
  captchaEnabled?: boolean
  /**
   * Options for connecting to external wallets like Coinbase Wallet, MetaMask, etc.
   *
   * @experimental This is an experimental config that is subject to breaking changes without a major version bump of the SDK.
   */
  externalWallets?: ExternalWalletsConfig
  /** All embedded wallets configuration */
  embeddedWallets?: {
    /**
     * Whether an embedded wallet should be created for the user on login. This overrides the
     * deprecated `createPrivyWalletOnLogin`.
     *
     * For `all-users`, the user will be prompted to create a Privy wallet after successfully
     * logging in. If they cancel or are visiting after this flag was put in place, they will be
     * prompted to create a wallet on their next login.
     *
     * For `users-without-wallets`, the user will be prompted to create a Privy wallet after\
     * successfully logging in, only if they do not currently have any wallet associated with their
     * user object - for example if they have linked an external wallet.
     *
     * For `off`, an embedded wallet is not created during login. You can always prompt the user to
     * create one manually with your app.
     *
     * Defaults to 'off'.
     */
    createOnLogin?: EmbeddedWalletCreateOnLoginConfig
    /**
     * @deprecated. Instead, use the server-driven configuration found in the Privy console: https://dashboard.privy.io/apps/YOUR_APP_ID/embedded. This client-side setting
     * is currently honored, but will be fully removed in a future release.
     *
     * If true, Privy will prompt users to create a password for their Privy embedded wallet.
     * If false, embedded wallets will be created without the need of password.
     *
     * Defaults to false.
     */
    requireUserPasswordOnCreate?: boolean
    /**
     * @deprecated. Instead, use the server-driven configuration found in the Privy console: https://dashboard.privy.io/apps/YOUR_APP_ID/embedded.
     * If true, Privy will not prompt or instantiate any UI for embedded wallet signatures and transactions.
     * If false, embedded wallet actions will raise a modal and require user confirmation to proceed.
     *
     * Defaults to false.
     */
    noPromptOnSignature?: boolean
    /**
     * @experimental
     *
     * **This setting is only honored when using the EIP-1193 Ethereum Provider to interface
     * with the embedded wallet, i.e. using `getEthereumProvider` or `getEthersProvider`.
     * This setting is only honored when used alongside `noPromptOnSignature: true`**
     *
     * If true, calls to `sendTransaction` will wait for the transaction to be confirmed before resolving.
     * If false, calls to `sendTransaction` will resolve once the transaction has been submitted.
     *
     * Defaults to true.
     *
     * @example
     * <PrivyProvider
     *   config={{
     *     embeddedWallets: {
     *       noPromptOnSignature: true,
     *       waitForTransactionConfirmation: false,
     *     },
     *   }}
     * >
     *   {children}
     * </PrivyProvider>
     */
    waitForTransactionConfirmation?: boolean
    /**
     * Options to customize the display of transaction prices in the embedded wallet's transaction
     * prompt. You may configure a primary currency to emphasize, and a secondary currency to show
     * as subtext. Defaults to emphasizing the price in fiat currency, and showing the price in the native
     * token as subtext.
     *
     * You may either set:
     * - `{primary: 'fiat-currency', secondary: 'native-token'}` to emphasize fiat currency prices, showing native token
     *    prices as subtext. This is the default.
     * - `{secondary: 'native-token', secondary: null}` to show native token prices only, with no subtext.
     *
     * Privy does not currently support:
     * - emphasizing native token prices over fiat currency prices
     * - showing prices only in fiat currency, without native token prices
     *
     */
    priceDisplay?: PriceDisplayOptions
  }
  /**
   * All multi-factor authentication configuration
   */
  mfa?: {
    /**
     * If true, Privy will not prompt or instantiate any UI for MFA Verification. The developer
     * must handle MFA verification themselves.
     * If false, any action that requires MFA will raise a modal and require user to verify MFA
     * before proceeding.
     *
     * Defaults to false.
     */
    noPromptOnMfaRequired?: boolean
  }
  /**
   * @deprecated. Use `fundingMethodConfigurations -> moonpay -> useSandbox` instead.
   * Setting associated with fiat-on-ramp flows
   */
  fiatOnRamp?: {
    /**
     * Determines whether to use the sandbox flow.
     *
     * Defaults to false.
     */
    useSandbox?: boolean
  }
  /**
   * Settings associated with funding methods
   */
  fundingMethodConfig?: {
    moonpay: {
      /**
       * Determines whether to use the Moonpay sandbox flow.
       *
       * Defaults to false.
       */
      useSandbox?: boolean
      /**
       * Determines the payment method for each Moonpay transaction.
       *
       * Defaults to Moonpay's default.
       */
      paymentMethod?: MoonpayPaymentMethod
      /**
       * Determines the UI settings for each Moonpay transaction.
       *
       * Defaults to Moonpay's default.
       */
      uiConfig?: MoonpayUiConfig
    }
  }
}
