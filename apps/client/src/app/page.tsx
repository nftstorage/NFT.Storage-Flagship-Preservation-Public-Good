"use client";
import FlexColumn from "@/_ui/flex/FlexColumn";
import FlexWindow from "@/_ui/flex/FlexWindow";
import Modal from "@/_ui/modal/Modal";
import NavLeft from "@/_ui/nav/NavLeft";
import Text from "@/_ui/text/Text";
import Api from "@/components/api/Api";
import Dashboard from "@/components/dashboard/Dashboard";
import Payments from "@/components/payments/Payments";
import Support from "@/components/support/Support";
import { useEffect, useState } from "react";
import style from "@/styles/GlobalConstants";
import FlexRow from "@/_ui/flex/FlexRow";
import ButtonNative from "@/_ui/buttons/ButtonNative";
import useAuth from "@/hooks/useAuth";
import { config } from "@/config";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function SingleCollection() {
  const [tab, setTab] = useState<any>("Dashboard");
  const [conditionsModal, setConditionsModal] = useState<boolean>(true);
  const closeConditionModal = () => {
    setConditionsModal(false);
  };

  const handleTabChange = (tab: any) => {
    setTab(tab);
  };
  const router = useRouter();
  const searchParams = useSearchParams();
  const hookAuth = useAuth();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenPayload: any = jwtDecode(accessToken);
      if (tokenPayload) {
        const restricted = tokenPayload?.restricted;
        if (restricted == true) {
          hookAuth.setShowConditions(true);
        }
      }
    }
  }, []);
  return (
    <>
      {/* {console.log(hookAuth.showConditions)} */}
      {hookAuth.showConditions && (
        <div
          style={{
            position: "absolute",
            background: "rgb(0,0,0,0.5)",
            width: "100vw",
            height: "100vh",
            zIndex: "100",
          }}
        >
          <FlexColumn>
            <Modal
              isClosable={false}
              isOpen={conditionsModal}
              onClose={closeConditionModal}
              size="md"
              body={
                <>
                  <Text
                    fontSize={style.font.h3}
                    fontFamily="chicagoflf"
                    marginBottom={style.margin.xxs}
                  >
                    Terms of Service
                  </Text>
                  <div
                    style={{
                      height: "200px",
                      overflowY: "scroll",
                      border: "1px solid #000",
                      padding: style.padding.sm,
                    }}
                  >
                    <Text>
                      For the NFT.Storage Classic ToS, see
                      classic.nft.storage/terms.
                      <br /> The following terms and conditions govern all use
                      of the NFT.Storage website (“NFT.Storage” or the
                      “Website”), all NFT.Storage APIs (“APIs,”) and all
                      content, services and products available at or through the
                      Gateway, APIs, or Website (collectively, “Services”),
                      other than the NFT.Storage Classic product and
                      nftstorage.link gateway, which are governed by the Terms
                      of Service available at classic.nft.storage/terms. The
                      Services are offered subject to your acceptance without
                      modification of all of the terms and conditions contained
                      herein.
                      <br /> If you do not agree to all the terms and conditions
                      of this agreement (“Agreement” or “TOS”), then you may not
                      access the Website or use any of the Services. You also
                      agree and certify that you have complied, and will
                      continue to apply with all applicable laws in using the
                      Services.
                      <br /> NFT.Storage Ltd. (“we,” “us”) may make changes to
                      this Agreement and pricing from time to time. If you do
                      not agree to these revisions, you may stop using the
                      Services.
                      <br /> If you are entering into this Agreement on behalf
                      of a company, organization, or another legal entity, you
                      are agreeing to the terms of this Agreement for that
                      entity and representing to us that you have the authority
                      to bind that entity to this Agreement.
                    </Text>
                    <Text
                      fontFamily="chicagoflf"
                      fontSize={style.font.h3}
                      marginBottom={style.margin.xxs}
                      marginTop={style.margin.xxs}
                    >
                      Storage term
                    </Text>
                    <Text>
                      In order to store data via the Services, you must first
                      upload it to the IPFS network and obtain a content
                      identifier (CID). Upon specifying a CID, data will be
                      stored on the Filecoin network via the Services. <br />
                      We strive to provide a consistent long-term storage
                      solution for NFT.Storage users. You can find more about
                      our commitment to long-term storage{" "}
                      <a href="https://nft.storage/posts/nft-storage-endowment-model">
                        here
                      </a>
                      . <br />
                      All data uploaded to NFT.Storage is available to anyone
                      who requests it using the correct CID. Users should not
                      store any private or sensitive information in an
                      unencrypted form using NFT.Storage. Further, deleting
                      files from NFT.Storage via the site&#39;s Files page or
                      API will remove them from the file listing for a
                      user&#39;s account, but storage providers on the Filecoin
                      network and/or IPFS nodes that have stored the data may
                      retain copies of the data after you’ve deleted it via
                      NFT.Storage, and smart contracts to renew the storage
                      deals on the Filecoin network may be irreversible. Users
                      should not use NFT.Storage to store data that may need to
                      be permanently deleted in the future. <br />
                      By using the Services, you certify that you own the
                      copyright or have obtained the necessary permissions to
                      upload any files you upload via the Services. We reserve
                      the right to remove any content that infringes upon the
                      intellectual property rights of others or otherwise
                      violates our Acceptable Use policy below.
                    </Text>
                    <Text
                      fontFamily="chicagoflf"
                      fontSize={style.font.h3}
                      marginBottom={style.margin.xxs}
                      marginTop={style.margin.xxs}
                    >
                      Filecoin Deals
                    </Text>
                    <Text>
                      Data stored via the Services is pushed to storage on
                      Filecoin, where the data is batched into deals. There may
                      be a delay between content being uploaded via the Services
                      and being stored on Filecoin through a deal.
                      <br /> The Services do not include payments for Filecoin
                      retrieval deals, or for IPFS pinning. You are responsible
                      for paying for any Filecoin retrieval services or IPFS
                      pinning services to the extent you use them.
                    </Text>
                    <Text
                      fontFamily="chicagoflf"
                      fontSize={style.font.h3}
                      marginBottom={style.margin.xxs}
                      marginTop={style.margin.xxs}
                    >
                      Data Limits
                    </Text>
                    <Text>
                      For information on API rate limits, such as read and write
                      request limits, please refer to the documentation here:
                      nft.storage/docs.
                      <br /> Files that are exceedingly large may fail to upload
                      via the Services, in which case you will receive an error
                      message. We expect that the vast majority of users will
                      not run into this issue. <br />
                      Additionally, we reserve the right to utilize additional
                      technical verification for data being uploaded via the
                      Services, such as to verify that the content identifier of
                      data matches the token ID, or that the data is actually
                      NFT metadata.
                    </Text>
                    <Text
                      fontFamily="chicagoflf"
                      fontSize={style.font.h3}
                      marginBottom={style.margin.xxs}
                      marginTop={style.margin.xxs}
                    >
                      Paid Accounts
                    </Text>
                    <Text>
                      Billing.
                      <br /> In order to store data via the Services, you will
                      need to pay a one-time fee per GB of data to access
                      storage via the Services (the “Paid Plan.”) You can find
                      our pricing information at this link: nft.storage/pricing.
                      To enter into the Paid Plan and receive access to storage
                      via the Services, you will need to provide us with one or
                      more Payment Methods. &#34;Payment Method&#34; means a
                      current, valid method of payment, which may involve a
                      third party or payment processing vendor (such as Stripe),
                      in which case you will also be subject to that third
                      party’s terms and conditions. Payments made via the Paid
                      Plan are one-time fees per GB of data, are nonrefundable,
                      and the resulting storage must be activated within one
                      year of payment. <br /> You agree that you’ll pay the
                      amounts set forth in nft.storage/pricing (the “Fees”) for
                      each billing cycle.
                      <br /> You authorize us to charge any Payment Method
                      associated with your account in case your primary Payment
                      Method is declined or no longer available to us for
                      payment of Fees you owe us. You remain responsible for any
                      uncollected Fees. If a payment is not successfully
                      settled, due to expiration, insufficient funds, or
                      otherwise, and you do not cancel your account, we may
                      remove data from any of our hosted systems. For some
                      Payment Methods, the issuer may charge you additional
                      fees, such as foreign transaction fees or other fees
                      relating to the processing of your Payment Method.
                      <br />
                      Changes.
                      <br /> We reserve the right to change our Paid Plan or
                      adjust pricing for our service or any components thereof
                      in any manner and at any time, in our sole discretion and
                      without notice. If we adjust the pricing of the Paid Plan,
                      we will provide you with at least fourteen (14) days’
                      notice before these changes take effect. By continuing to
                      use the Services, you agree to the terms of this Agreement
                      (including any updated terms).
                      <br /> Taxes. <br />
                      The Fees do not include any taxes, levies, duties, or
                      similar governmental assessments, including value-added,
                      sales, use, or withholding taxes assessable by any
                      domestic or foreign jurisdiction (“Taxes”). You agree that
                      you’re responsible for any applicable Taxes, and that you
                      will provide us with any applicable tax identification
                      information that we may require by law to ensure our
                      compliance with applicable tax regulations and authorities
                      in applicable jurisdictions.
                    </Text>
                    <Text
                      fontFamily="chicagoflf"
                      fontSize={style.font.h3}
                      marginBottom={style.margin.xxs}
                      marginTop={style.margin.xxs}
                    >
                      Acceptable Use
                    </Text>
                    <Text>
                      You will retain all right, title, and interest in and to
                      any data, or materials of any type that you upload or
                      cause to be uploaded using the Services (collectively,
                      “Content”). You hereby grant us a non-exclusive,
                      worldwide, royalty-free, sublicensable right to collect,
                      store, use, copy, transmit, modify, and create derivative
                      works of this Content solely to the extent necessary to
                      provide the Services.
                      <br /> You are entirely responsible for all Content you
                      upload or cause to be uploaded using the Services - and
                      you’re also responsible for any harm resulting from that
                      Content. For your own protection and the protection of our
                      network & community, you may not use the Services for
                      activities such as:
                      <br /> Scams, Spam, and Server Misuse: <br />
                      Posting or distributing Content that contains any viruses,
                      malware, worms, Trojan horses, malicious code, or other
                      harmful or destructive Content; <br />
                      Tricking users into revealing sensitive information to an
                      unauthorized party (e.g., phishing) or misleading users as
                      to the source of Content (e.g., spoofing);
                      <br /> Naming your Content in a manner that misleads
                      readers into thinking you are another person or company;
                      <br />
                      Posting or distributing spam, including Content advertised
                      via unwanted electronic messages on newsgroups, email
                      lists, blogs, websites, and other unsolicited promotional
                      materials;
                      <br /> Unethical or unwanted commercial Content designed
                      to drive traffic to third party sites or boost the search
                      engine rankings of third party sites; <br />
                      Interfering with or disrupting the Services, or creating
                      an undue burden on the Services or the networks or
                      services connected to the Services, including (a) activity
                      impacting the service level of other NFT.Storage users or
                      (b) via a distributed denial of service attack.
                      <br />
                      Infringement of Others’ Rights: <br />
                      Infringing the proprietary rights, including but not
                      limited to the copyright, patent, trademark or trade
                      secret rights, of any third party; <br />
                      Failing to comply with any third-party licenses relating
                      to Content or failing to complete all necessary steps to
                      pass any required license terms to end users; <br />
                      Violating the privacy or publicity rights of any third
                      party. <br />
                      Other Restricted Purposes: <br />
                      Using the Services for solicitation of unlawful services
                      or posting obscene material that is unlawful under
                      applicable law;
                      <br /> Inciting violence or threatening others, directly
                      or indirectly;
                      <br /> Posting or distributing child sexual abuse material
                      or Content encouraging or inciting terrorism;
                      <br /> Using the Services in a way that is reasonably
                      likely to cause or increase the risk of harm to any
                      person(s) or group(s).
                      <br /> We have the right (though not the obligation) to,
                      in our sole discretion (i) refuse, block, or remove any
                      Content; (ii) block uploads, or (iii) temporarily or
                      permanently suspend access to your account if, in our
                      reasonable opinion, there has been a breach of this TOS in
                      any way for any reason. We will have no obligation to
                      provide any compensation or a refund of any amounts
                      previously paid.
                    </Text>
                    <Text
                      fontFamily="chicagoflf"
                      fontSize={style.font.h3}
                      marginBottom={style.margin.xxs}
                      marginTop={style.margin.xxs}
                    >
                      Additional Terms
                    </Text>
                    <Text>
                      This Agreement will be governed by the laws of the state
                      of Delaware without regard to conflict of law principles.
                      <br />
                      To the extent you provide any ideas, suggestions, or other
                      feedback to us regarding the Services (“Feedback”) you
                      hereby grant us all rights, titles, and interests (such as
                      intellectual property rights) to that Feedback.
                      <br /> You are responsible for maintaining the
                      confidentiality of all usernames, passwords, and other
                      access credentials created by or assigned by you, and are
                      solely responsible for all activities that occur with such
                      credentials. If you permit third-parties to use your
                      credentials to access the Services, you do so at your sole
                      risk and we will not be directly or indirectly responsible
                      or liable to you in any manner for any damages, harms,
                      losses, or claims arising out of or in connection with
                      such permission of your credentials.
                      <br /> If you are on any U.S. or E.U. sanctions list, or
                      residing in any U.S. or E.U.-sanctioned region, you may
                      not use the Services. You agree that you will not access
                      the Services using any technology to circumvent applicable
                      laws, such as sanctions laws.
                      <br /> In order to use the Services you must be 13 years
                      of age or older. If you are 13 or older but under 18 years
                      of age, you must have your parent or legal guardian’s
                      permission to use NFT.Storage and to accept the terms of
                      this TOS.
                      <br /> You may have access to third-party websites and
                      webpages through the Services, and you take full
                      responsibility for your use of those third-party sites
                      which fall outside the scope and control of the Services.
                      We have not reviewed those third-party websites, do not
                      have control over them, do not endorse them, and are not
                      responsible for their contents or their use.
                      <br /> To the extent the Services are dependent on
                      services hosted or operated by third-parties, including
                      payment processors or independent storage networks, we are
                      not responsible for any outages or disruptions caused by
                      those third-parties, such as storage networks or payment
                      processors unexpectedly going offline.
                      <br /> TO THE MAXIMUM EXTENT PERMITTED BY LAW (A) YOU
                      ASSUME ALL LIABILITY FOR ANY DAMAGES, CLAIMS, EXPENSES OR
                      OTHER COSTS (INCLUDING, WITHOUT LIMITATION, ATTORNEYS’
                      FEES) YOU SUFFER OR INCUR AS A RESULT OF THIRD-PARTY
                      CLAIMS RELATING TO YOUR USE OF THE SERVICES, (B) YOU
                      ASSUME ALL LIABILITY FOR ANY INDIRECT, SPECIAL,
                      INCIDENTAL, PUNITIVE OR CONSEQUENTIAL DAMAGES, AND (C)
                      YOUR MAXIMUM AGGREGATE DAMAGES ARISING OUT OF OR IN
                      CONNECTION WITH THE SERVICES SHALL BE LIMITED TO $100,
                      REGARDLESS OF THE CAUSE. <br />
                      This Agreement constitutes the entire and exclusive
                      understanding and agreement between you and us regarding
                      your use of and access to the Services. You may not assign
                      or transfer this Agreement or your rights hereunder, in
                      whole or in part, without our prior written consent. We
                      may assign this Agreement at any time without notice. The
                      failure to require performance of any provision will not
                      affect our right to require performance at any time
                      thereafter, nor will a waiver of any breach or default of
                      this Agreement or any provision of this Agreement
                      constitute a waiver of any subsequent breach or default or
                      a waiver of the provision itself. <br />
                      In the event that any part of this Agreement is held to be
                      invalid or unenforceable, the unenforceable part will be
                      given effect to the greatest extent possible and the
                      remaining parts will remain in full force and effect.
                    </Text>
                  </div>
                </>
              }
              footer={
                <FlexRow hrAlign="flex-end">
                  <ButtonNative
                    variant="dark"
                    onClick={async () => {
                      const accessToken = localStorage.getItem("accessToken");
                      const token = await fetch(
                        `${config.server}/api/v1/auth/accept_terms`,
                        {
                          method: "GET",
                          headers: {
                            Authorization: `Bearer ${accessToken}`,
                          },
                        }
                      );
                      const tokenvalue = await token.json();
                      // console.log(tokenvalue);
                      if (tokenvalue.ok == true) {
                        localStorage.setItem(
                          "accessToken",
                          tokenvalue.value.accessToken
                        );
                        router.push("/");
                      } else {
                        toast.error(tokenvalue.error.message);
                      }
                      hookAuth.setShowConditions(false);
                      window.location.reload();
                    }}
                    width="100px"
                  >
                    Agree
                  </ButtonNative>
                </FlexRow>
              }
            />
          </FlexColumn>
        </div>
      )}
      <FlexWindow
        navLeft={<NavLeft tabChange={handleTabChange} />}
        bodyElem={
          <>
            {tab == "Dashboard" && (
              <>
                <Dashboard />
              </>
            )}
            {tab == "API Key" && (
              <>
                <Api />
              </>
            )}
            {tab == "Payment" && (
              <>
                <Payments />
              </>
            )}
            {tab == "Support" && (
              <>
                <Support />
              </>
            )}
          </>
        }
      />
    </>
  );
}
