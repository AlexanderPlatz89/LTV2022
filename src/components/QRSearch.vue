<template>
    <div class="p-content-single-page">
        <div class="p-grid">
            <BarcodeScanner @setDecoded="getDecodedBarcode" class="p-col-12"/>
        </div>
    </div>
</template>

<script>
    import BarcodeScanner from "@/components/Common/BarcodeScanner";


    export default {
        components: {
            'BarcodeScanner': BarcodeScanner,
        },
        methods: {
            getDecodedBarcode(data) {
                if (data != null) {
                    if (JSON.parse(data) != null) {
                        let jsonData = JSON.parse(data);
                        if (jsonData.action === "macchina") {
                            let id = Number(jsonData.id);
                            this.$router.push({
                                name: "macchina",
                                params: {id: id}
                            })
                        }
                    }
                }
            }
        },
        computed: {
            containerClass() {
                return ['layout-wrapper', {
                    'layout-horizontal': true,
                    'layout-overlay': true,
                    'layout-single-page': true
                }];
            },
        }
    }
</script>

<style lang="scss">
    .layout-single-page {
        .layout-topbar {
            .route-bar {
                left: 350px;
            }
        }

        .layout-topbar:before {
            content: "";
            position: absolute;
            top: 0;
            z-index: -1;
            left: 0;
            width: 350px;
            height: 60px;
            background-color: red;
            background-size: cover;
        }

        .p-content-single-page {
            padding: 1em;

            .p-fieldset-legend-text {
                font-weight: bold;
            }
        }
    }
    @media screen and (max-width: 896px) {
        .layout-single-page {
            .layout-topbar {
                .route-bar {
                    left: 80px;
                }
            }
            .layout-menu-button {
                display: none;
            }
        }
    }
</style>
